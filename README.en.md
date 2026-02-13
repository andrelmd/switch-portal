# Switch Portal 🌐

[🇧🇷 Português](README.md) | **🇺🇸 English**

Web portal for managing and controlling network switches (TP-Link TL-SG108E) connected to an SBC (Single Board Computer).

## 📋 About the Project

**Switch Portal** is a React-based frontend application that provides a modern and intuitive interface for managing network switches through an SBC. The system allows you to view, configure, and monitor network devices and their ports in real-time.

### Key Features

- 🔐 **Secure Authentication**: Login system with JWT tokens and HTTP-only cookies
- 📊 **Device Dashboard**: Grid view of all connected switches
- ⚙️ **Port Management**: Individual control of switch ports
- 🔄 **Real-time Status**: Device status monitoring (Online, Offline, Rebooting)
- 🚀 **Responsive Interface**: Adaptive design for different screen sizes
- 🎨 **Modern UI**: Interface built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

### Core
- **React** - UI library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server

### State and Data Management
- **Zustand** - Global state management
- **React Query (TanStack)** - Server data caching and synchronization
- **Axios** - HTTP client

### Routing and Forms
- **React Router** - Declarative routing
- **React Hook Form** - Performant form management
- **Zod** - Schema validation

### UI and Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons
- **Class Variance Authority** - Component variants

### Testing
- **Vitest** - Testing framework
- **React Testing Library** - React component testing
- **JSDOM** - DOM environment for tests

## 🏗️ Project Architecture

```
src/
├── api/              # HTTP client configurations (auth-api, device-api)
├── assets/           # Static resources
├── classes/          # Data classes and models
├── components/       # Reusable React components
│   ├── ui/          # Base UI components
│   └── ...          # Specific components (DevicesTable, DeviceCard, etc.)
├── constants/        # Application constants
├── contexts/         # React contexts (AuthProvider)
├── dtos/            # Data Transfer Objects and types
│   ├── device-dto.ts    # Device types
│   └── port-dto.ts      # Port types
├── helpers/          # Helper functions
├── hooks/           # Custom React Hooks
├── lib/             # Libraries and configurations
├── pages/           # Application pages
│   ├── device.tsx   # Device listing page
│   ├── port.tsx     # Port management page
│   ├── login.tsx    # Login page
│   └── ...
├── stores/          # Zustand stores
├── tests/           # Test configurations and utilities
├── App.tsx          # Root application component
└── main.tsx         # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/andrelmd/switch-portal
cd switch-portal
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (if needed):
```bash
# Create a .env file in the project root
# APIs are configured to http://localhost:8000
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

### Production Build

Generate the optimized build:
```bash
npm run build
```

Optimized files will be in `dist/`.

### Build Preview

Preview the production build locally:
```bash
npm run preview
```

### Testing

Run tests:
```bash
npm test
```

Run linter:
```bash
npm run lint
```

## 🔌 Backend Integration

The frontend communicates with a REST API through two configured clients:

- **Auth API**: `http://localhost:8000/api/auth/v1` - Authentication management
- **Device API**: `http://localhost:8000/api/devices/v1` - Device operations

### Expected Endpoints

#### Authentication
- `POST /login` - User authentication
- `POST /logout` - Session termination
- `POST /refresh` - Token renewal

#### Devices
- `GET /devices` - List all devices
- `POST /devices` - Create new device
- `GET /devices/:id` - Get device details
- `PATCH /devices/:id` - Update device
- `DELETE /devices/:id` - Remove device

#### Ports
- `GET /devices/:id/ports` - List device ports
- `PATCH /devices/:id/ports/:port` - Configure specific port

## 📊 Data Models

### Device
```typescript
interface DeviceDto {
  id: number
  name: string
  ip_address: string
  status: 0 | 1 | 2  // ONLINE | OFFLINE | REBOOTING
  ports: PortDto[]
}
```

### Port
```typescript
interface PortDto {
  port_number: number
  enabled: boolean
  speed: 1 | 2 | 3 | 4 | 5 | 6  // AUTO | 10MH | 10MF | 100MH | 100MF | 1000MF
  flow_control: boolean
}
```

## 📱 Application Routes

| Route | Description | Access |
|------|-----------|--------|
| `/` | Landing page | Public |
| `/login` | Login page | Public |
| `/devices` | Device list | Protected |
| `/devices/:id` | Port management | Protected |

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request
