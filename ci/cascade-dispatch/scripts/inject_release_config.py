#!/usr/bin/env python3
"""Inject real AdMob IDs into project.godot for a production export."""
import argparse, pathlib, re

p=argparse.ArgumentParser()
p.add_argument('--android-app-id',required=True)
p.add_argument('--android-banner-id',required=True)
p.add_argument('--ios-app-id',required=True)
p.add_argument('--ios-banner-id',required=True)
a=p.parse_args()
path=pathlib.Path(__file__).resolve().parents[1]/'project.godot'
s=path.read_text(encoding='utf-8')
repls={
 r'(?m)^general/android/app_id="[^"]*"$':f'general/android/app_id="{a.android_app_id}"',
 r'(?m)^general/ios/app_id="[^"]*"$':f'general/ios/app_id="{a.ios_app_id}"',
 r'(?m)^ads/android_banner_id="[^"]*"$':f'ads/android_banner_id="{a.android_banner_id}"',
 r'(?m)^ads/ios_banner_id="[^"]*"$':f'ads/ios_banner_id="{a.ios_banner_id}"',
}
for pat,repl in repls.items():
    s,n=re.subn(pat,repl,s)
    if n!=1:
        raise SystemExit(f'Expected exactly one match for {pat}, found {n}')
path.write_text(s,encoding='utf-8')
print('Injected production AdMob identifiers into project.godot')
