taskkill /IM node.exe /F
cd C:\Users\Hp\smart-souq-project
pnpm --filter backend dev &
pnpm --filter frontend dev &
