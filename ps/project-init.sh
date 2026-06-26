#!/bin/bash
# Yeh script puri enterprise folder structure aur placeholder route files generate karegi.

# 1. Root & Config Directories
mkdir -p prisma public/{images,icons,logos,blog,projects}

# 2. Source Directories
mkdir -p src/{app,components,lib,hooks,providers,styles,types,constants,config,utils,middleware}
mkdir -p src/components/{ui,layout,sections,animations,cursor,cards,forms,dashboard}

# 3. App Router Directories (Public)
mkdir -p src/app/\(public\)/{story,building,projects,blog,newsletter,contact,privacy,terms}

# 4. App Router Directories (Admin)
mkdir -p src/app/\(admin\)/dashboard/{projects,blog,messages,newsletter,analytics,timeline,settings,media}

# 5. API Routes
mkdir -p src/app/api/{webhooks/clerk,projects,blog,contact,newsletter}

# Generate Base Route Files (Public)
for route in story building projects blog newsletter contact privacy terms; do
  cat <<EOF > src/app/\(public\)/$route/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${route^} | Prabhsamrath Singh',
};

export default function ${route^}Page() {
  return (
    <section className="container mx-auto py-24">
      <h1 className="text-4xl font-bold tracking-tight text-foreground capitalize">${route}</h1>
    </section>
  );
}
EOF
done

# Generate Base Route Files (Admin)
for route in projects blog messages newsletter analytics timeline settings media; do
  cat <<EOF > src/app/\(admin\)/dashboard/$route/page.tsx
export default function Admin${route^}Page() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold tracking-tight capitalize">${route} Management</h1>
    </div>
  );
}
EOF
done

echo "Architecture folders and route files created successfully."