import math, pathlib, re, unittest

MAX_LEVEL=2_000_000_000
CERTIFIED_SPACE=2_902_376_448
DEADLINE=70
STRIDE=104_729
MAX_LIVES=5
LIFE=3600
FAULTS=8

def clamp_level(level): return min(MAX_LEVEL,max(1,level))
def address(level,nonce): return ((clamp_level(level)-1+max(0,nonce)*STRIDE)%MAX_LEVEL)+1
def generate(level,nonce=0):
    a=address(level,nonce); rank_=a-1; phase=rank_%24; rank_//=24; release=rank_%2+2; rank_//=2
    delays=[]
    for _ in range(10): delays.append(rank_%6+1); rank_//=6
    return dict(level=clamp_level(level),nonce=max(0,nonce),address=a,release=release,delays=delays,fault=phase%8,module=phase%3)
def healthy(s): return s['release']+sum(s['delays'])+s['module']+1
def simulate(s, action=-1):
    tick=s['release']+sum(s['delays'])
    if action != s['module']:
        if s['fault']==3: return False,tick+64+s['module']+1
        return False,tick
    tick += s['module']+1
    return tick<=DEADLINE,tick

def prune(losses,now):
    out=sorted([int(ts) for ts in losses if ts>now or now-ts<LIFE])
    return out[-MAX_LIVES:] if len(out)>MAX_LIVES else out
def lives(losses,now): return MAX_LIVES-len(prune(losses,now))

def source(path): return pathlib.Path(path).read_text(encoding='utf-8')
ROOT=pathlib.Path(__file__).parents[1]

class ReleaseLogicTests(unittest.TestCase):
    def test_retry_stride_covers_ring_without_early_repeat(self):
        self.assertEqual(math.gcd(STRIDE,MAX_LEVEL),1)
        for level in [1,2,19,20,21,99,1000,1_999_999_999,MAX_LEVEL]:
            sample=[address(level,n) for n in range(10_000)]
            self.assertEqual(len(sample),len(set(sample)))
            self.assertNotEqual(sample[0],sample[1])

    def test_generated_scenarios_always_have_healthy_solution(self):
        probes=list(range(1,100_001,7))+[MAX_LEVEL-2,MAX_LEVEL-1,MAX_LEVEL]
        for level in probes:
            s=generate(level, level%997)
            self.assertIn(s['release'],(2,3))
            self.assertEqual(len(s['delays']),10)
            self.assertTrue(all(1<=d<=6 for d in s['delays']))
            self.assertIn(s['module'],(0,1,2))
            self.assertLessEqual(healthy(s),DEADLINE)
            ok,tick=simulate(s,s['module'])
            self.assertTrue(ok)
            self.assertLessEqual(tick,DEADLINE)
            for wrong in [i for i in range(3) if i!=s['module']]:
                self.assertFalse(simulate(s,wrong)[0])

    def test_fault_family_distribution_and_module_distribution(self):
        faults=set(); modules=set()
        for level in range(1,5000):
            s=generate(level); faults.add(s['fault']); modules.add(s['module'])
        self.assertEqual(faults,set(range(8)))
        self.assertEqual(modules,{0,1,2})

    def test_per_loss_hourly_recharge(self):
        now=1_000_000
        losses=[now-3599,now-2700,now-1800,now-900,now]
        self.assertEqual(lives(losses,now),0)
        self.assertEqual(lives(losses,now+1),1)
        self.assertEqual(lives(losses,now+900),2)
        self.assertEqual(lives(losses,now+1800),3)
        self.assertEqual(lives(losses,now+2700),4)
        self.assertEqual(lives(losses,now+3600),5)

    def test_clock_rollback_does_not_grant_lives(self):
        now=1_000_000
        self.assertEqual(lives([now+100],now),4)

    def test_localization_has_same_core_keys_for_all_12(self):
        text=source(ROOT/'src/locale_catalog.gd')
        ids=re.findall(r'\{"id":"([^"]+)"',text)
        self.assertEqual(len(ids),12)
        for loc in ids:
            self.assertIn(f'"{loc}": {{',text)
        required=['title','begin','continue','attempts','scan','commit','resolved','failed','fresh','privacy','support','language']
        for loc in ids:
            block=text.split(f'"{loc}": {{',1)[1].split('},\n',1)[0]
            for key in required: self.assertIn(f'"{key}"',block, f'{loc}:{key}')

    def test_release_guards(self):
        main=source(ROOT/'src/main.gd')
        engine=source(ROOT/'src/cascade_engine.gd')
        life=source(ROOT/'src/life_manager.gd')
        commerce=source(ROOT/'src/commerce_service.gd')
        admob=source(ROOT/'src/admob_runtime.gd')
        self.assertIn('DEADLINE_SECONDS := 30.0',main)
        self.assertIn('state["attempt_nonce"] = int(state["attempt_nonce"]) + 1',main)
        self.assertNotIn('correct answer',main.lower())
        self.assertIn('RETRY_STRIDE',engine)
        self.assertIn('RECHARGE_SECONDS: int = 60 * 60',life)
        self.assertIn('GOOGLE_PRODUCT_TYPE_INAPP := 0',commerce)
        self.assertIn('GOOGLE_PURCHASED_STATE := 1',commerce)
        self.assertIn('GodotStoreKit2',commerce)
        self.assertIn('extras["npa"] = "1"',admob)
        self.assertIn('extras["rdp"] = "1"',admob)

if __name__=='__main__': unittest.main(verbosity=2)
