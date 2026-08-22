# Cascade Dispatch — Godot Mobile RC1

This directory is the readable mobile release-candidate source used by the isolated Android CI build branch.

Locked behaviour: sequential Crisis 1 through 2,000,000,000; deterministic certified puzzle generation; 30-second decision window; scan A/B/C then commit exactly one reset; failed/timeout grids are discarded and retries are fresh; five free attempts with independent one-hour recovery; lifetime product `cascade_dispatch_unlimited_forever`; no ads on Home or active gameplay; 12 UI locales including RTL Arabic; device-local progress.

Key files:
- `src/main.gd` — complete Ocean Pearl mobile app shell/gameplay flow
- `src/cascade_engine.gd` — deterministic 2B crisis engine
- `src/life_manager.gd` — independent one-hour attempt recovery
- `src/save_manager.gd` — local state + rollback-resistant time floor
- `src/commerce_service.gd` — Google Play / StoreKit 2 entitlement adapter
- `src/ad_service.gd`, `src/admob_runtime.gd` — privacy-gated non-personalized banner adapter
- `src/locale_catalog.gd` — 12-language UI catalogue
- `tests/test_release_logic.py` — deterministic/economy/localization regression tests
- `scripts/release_guard.py` — release assertions and production AdMob fail-closed guard

Local validation:
`python -m unittest discover -s tests -v`
`python scripts/release_guard.py`

Production still requires real store/AdMob identifiers, matching native plugin binaries and signing credentials; debug/source validation never substitutes those values.
