#!/usr/bin/env python3
import pathlib, re, sys
root=pathlib.Path(__file__).resolve().parents[1]
errors=[]

def txt(p):
    q=root/p
    if not q.exists():
        errors.append(f'missing: {p}')
        return ''
    return q.read_text(encoding='utf-8')

project=txt('project.godot')
main=txt('src/main.gd')
cfg=txt('src/release_config.gd')
commerce=txt('src/commerce_service.gd')
ads=txt('src/admob_runtime.gd')
checks=[
 ('main scene','run/main_scene="res://scenes/main.tscn"' in project),
 ('2B range','2_000_000_000' in txt('src/cascade_engine.gd')),
 ('30 second decision','DEADLINE_SECONDS := 30.0' in main),
 ('fresh retry nonce','attempt_nonce' in main and 'RETRY_STRIDE' in txt('src/cascade_engine.gd')),
 ('per-loss recharge','loss_timestamps' in txt('src/life_manager.gd')),
 ('stable product id','cascade_dispatch_unlimited_forever' in cfg),
 ('Google purchase state','GOOGLE_PURCHASED_STATE := 1' in commerce),
 ('StoreKit2','GodotStoreKit2' in commerce),
 ('nonpersonalized ads','extras["npa"] = "1"' in ads),
 ('restricted data processing','extras["rdp"] = "1"' in ads),
 ('privacy URL','/cascade-dispatch/privacy/' in cfg),
 ('latest light skin','const BG := Color("edf5f5")' in main and 'OCEAN PEARL' in main),
 ('no gameplay ad call','ads.load_banner()' not in main.split('func _start_crisis()',1)[1].split('func _relay_text()',1)[0] if 'func _start_crisis()' in main else False),
]
for label,ok in checks:
    if not ok:
        errors.append(f'guard failed: {label}')
loc=txt('src/locale_catalog.gd')
if len(re.findall(r'\{"id":"[^"]+","name":"[^"]+"\}',loc)) != 12:
    errors.append('guard failed: expected 12 locale declarations')

production='--production' in sys.argv
if production:
    demo_publisher='3940256099942544'
    app_id_android=re.search(r'general/android/app_id="([^"]*)"',project)
    app_id_ios=re.search(r'general/ios/app_id="([^"]*)"',project)
    banner_android=re.search(r'ads/android_banner_id="([^"]*)"',project)
    banner_ios=re.search(r'ads/ios_banner_id="([^"]*)"',project)
    for label,m in [('Android AdMob app ID',app_id_android),('iOS AdMob app ID',app_id_ios),('Android banner ID',banner_android),('iOS banner ID',banner_ios)]:
        value=m.group(1).strip() if m else ''
        if not value or demo_publisher in value:
            errors.append(f'production guard failed: real {label} required')

if errors:
    print('RELEASE GUARD: FAIL')
    for e in errors:
        print(' -',e)
    sys.exit(1)
print('RELEASE GUARD: PASS')
for label,_ in checks:
    print(' -',label)
if production:
    print(' - production AdMob identifiers')
