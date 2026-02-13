# Switch Portal 🌐

**🇧🇷 Português** | [🇺🇸 English](README.en.md)

Portal web para gerenciamento e controle de switches (TL-SG108E da TP-Link) de rede conectados a um SBC (Single Board Computer).

## 📋 Sobre o Projeto

O **Switch Portal** é uma aplicação frontend desenvolvida em React que fornece uma interface moderna e intuitiva para gerenciar switches de rede através de um SBC. O sistema permite visualizar, configurar e monitorar dispositivos de rede e suas portas em tempo real.

### Principais Funcionalidades

- 🔐 **Autenticação Segura**: Sistema de login com tokens JWT e cookies HTTP-only
- 📊 **Dashboard de Dispositivos**: Visualização em grade de todos os switches conectados
- ⚙️ **Gerenciamento de Portas**: Controle individual de portas de switch
- 🔄 **Status em Tempo Real**: Monitoramento do status dos dispositivos (Online, Offline, Reiniciando)
- 🚀 **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela
- 🎨 **UI Moderna**: Interface construída com componentes shadcn/ui e Tailwind CSS

## 🛠️ Stack Tecnológico

### Core
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### Gerenciamento de Estado e Dados
- **Zustand** - Gerenciamento de estado global
- **React Query (TanStack)** - Cache e sincronização de dados do servidor
- **Axios** - Cliente HTTP

### Roteamento e Formulários
- **React Router** - Roteamento declarativo
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas

### UI e Estilização
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes acessíveis
- **Radix UI** - Primitivos de UI headless
- **Lucide React** - Ícones
- **Class Variance Authority** - Variantes de componentes

### Testes
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes React
- **JSDOM** - Ambiente DOM para testes

## 🏗️ Arquitetura do Projeto

```
src/
├── api/              # Configurações de clientes HTTP (auth-api, device-api)
├── assets/           # Recursos estáticos
├── classes/          # Classes e modelos de dados
├── components/       # Componentes React reutilizáveis
│   ├── ui/          # Componentes de UI base
│   └── ...          # Componentes específicos (DevicesTable, DeviceCard, etc.)
├── constants/        # Constantes da aplicação
├── contexts/         # Contextos React (AuthProvider)
├── dtos/            # Data Transfer Objects e tipos
│   ├── device-dto.ts    # Tipos de dispositivos
│   └── port-dto.ts      # Tipos de portas
├── helpers/          # Funções auxiliares
├── hooks/           # Custom React Hooks
├── lib/             # Bibliotecas e configurações
├── pages/           # Páginas da aplicação
│   ├── device.tsx   # Página de listagem de dispositivos
│   ├── port.tsx     # Página de gerenciamento de portas
│   ├── login.tsx    # Página de login
│   └── ...
├── stores/          # Stores Zustand
├── tests/           # Configurações e utilitários de teste
├── App.tsx          # Componente raiz da aplicação
└── main.tsx         # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/andrelmd/switch-portal/
cd switch-portal
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (se necessário):
```bash
# Crie um arquivo .env na raiz do projeto
# As APIs estão configuradas para http://localhost:8000
```

### Desenvolvimento

Execute o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Build de Produção

Gere a build otimizada:
```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`.

### Preview da Build

Visualize a build de produção localmente:
```bash
npm run preview
```

### Testes

Execute os testes:
```bash
npm test
```

Execute o linter:
```bash
npm run lint
```

## 🔌 Integração com Backend

O frontend comunica-se com uma API REST através de dois clientes configurados:

- **Auth API**: `http://localhost:8000/api/auth/v1` - Gerenciamento de autenticação
- **Device API**: `http://localhost:8000/api/devices/v1` - Operações com dispositivos

### Endpoints Esperados

#### Autenticação
- `POST /login` - Autenticação de usuário
- `POST /logout` - Encerramento de sessão
- `POST /refresh` - Renovação de token

#### Dispositivos
- `GET /devices` - Listar todos os dispositivos
- `POST /devices` - Criar novo dispositivo
- `GET /devices/:id` - Obter detalhes de um dispositivo
- `PATCH /devices/:id` - Atualizar dispositivo
- `DELETE /devices/:id` - Remover dispositivo

#### Portas
- `GET /devices/:id/ports` - Listar portas do dispositivo
- `PATCH /devices/:id/ports/:port` - Configurar porta específica

## 📊 Modelos de Dados

### Device (Dispositivo)
```typescript
interface DeviceDto {
  id: number
  name: string
  ip_address: string
  status: 0 | 1 | 2  // ONLINE | OFFLINE | REBOOTING
  ports: PortDto[]
}
```

### Port (Porta)
```typescript
interface PortDto {
  port_number: number
  enabled: boolean
  speed: 1 | 2 | 3 | 4 | 5 | 6  // AUTO | 10MH | 10MF | 100MH | 100MF | 1000MF
  flow_control: boolean
}
```

## 📱 Rotas da Aplicação

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Landing page | Público |
| `/login` | Página de login | Público |
| `/devices` | Lista de dispositivos | Protegido |
| `/devices/:id` | Gerenciamento de portas | Protegido |

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request
