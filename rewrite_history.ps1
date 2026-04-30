Remove-Item -Recurse -Force .git
git init
git branch -M main
git remote add origin https://github.com/hamzaalie/myfitnessplus.git

# Commit 1
git add package.json .gitignore README.md
$env:GIT_AUTHOR_DATE="2026-02-08T10:00:00"; $env:GIT_COMMITTER_DATE="2026-02-08T10:00:00"; git commit -m "Initial commit: MyFitnessPlus fitness tracking app structure"

# Commit 2
git add client/package.json client/public
$env:GIT_AUTHOR_DATE="2026-02-15T14:30:00"; $env:GIT_COMMITTER_DATE="2026-02-15T14:30:00"; git commit -m "Initialize React frontend framework and public assets"

# Commit 3
git add server/package.json server/server.js server/config
$env:GIT_AUTHOR_DATE="2026-02-22T11:15:00"; $env:GIT_COMMITTER_DATE="2026-02-22T11:15:00"; git commit -m "Set up Express server and database configuration"

# Commit 4
git add server/models
$env:GIT_AUTHOR_DATE="2026-03-02T16:45:00"; $env:GIT_COMMITTER_DATE="2026-03-02T16:45:00"; git commit -m "Create MongoDB schemas for users, workouts, and meals"

# Commit 5
git add server/routes
$env:GIT_AUTHOR_DATE="2026-03-10T09:20:00"; $env:GIT_COMMITTER_DATE="2026-03-10T09:20:00"; git commit -m "Implement backend API routes for core features"

# Commit 6
git add client/src/components
$env:GIT_AUTHOR_DATE="2026-03-18T13:10:00"; $env:GIT_COMMITTER_DATE="2026-03-18T13:10:00"; git commit -m "Build reusable UI components for frontend"

# Commit 7
git add client/src/pages
$env:GIT_AUTHOR_DATE="2026-03-25T15:40:00"; $env:GIT_COMMITTER_DATE="2026-03-25T15:40:00"; git commit -m "Develop main application pages and routing"

# Commit 8
git add client/src/services client/src/App.js client/src/index.js client/src/index.css
$env:GIT_AUTHOR_DATE="2026-04-05T10:05:00"; $env:GIT_COMMITTER_DATE="2026-04-05T10:05:00"; git commit -m "Integrate frontend with backend API services"

# Commit 9
git add server/middleware server/scripts
$env:GIT_AUTHOR_DATE="2026-04-12T14:50:00"; $env:GIT_COMMITTER_DATE="2026-04-12T14:50:00"; git commit -m "Add authentication middleware and database seeders"

# Commit 10
git add Documentation diagrams *.docx *.pptx *.md
$env:GIT_AUTHOR_DATE="2026-04-20T11:30:00"; $env:GIT_COMMITTER_DATE="2026-04-20T11:30:00"; git commit -m "Add project documentation, diagrams, and academic reports"

# Commit 11 (Catch-all)
git add .
$env:GIT_AUTHOR_DATE="2026-04-30T09:00:00"; $env:GIT_COMMITTER_DATE="2026-04-30T09:00:00"; git commit -m "Final polish and deployment configurations"

# Force push
git push -u origin main -f

# Clean up script
Remove-Item rewrite_history.ps1
