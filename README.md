# Calculadora React

Una calculadora moderna construida con React, TypeScript y Vite.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 18 | Biblioteca de interfaz de usuario |
| TypeScript | Tipado estático |
| Vite | Bundler y servidor de desarrollo |
| Bun | Package manager y runtime |
| Vitest | Framework de testing |
| React Testing Library | Testing de componentes |
| Storybook | Documentación visual de componentes |
| ESLint | Linting del código |
| Docker / Docker Compose | Contenedorización |

## Funcionalidades

- Operaciones básicas: suma (`+`), resta (`-`), multiplicación (`×`), división (`÷`)
- Operaciones extra: módulo (`%`), punto decimal (`.`), cambio de signo (`+/-`)
- Display de máximo 9 caracteres
- Resultado `ERROR` en: subtracción negativa, desbordamiento (> 999 999 999), división por cero
- Reinicio automático al presionar un número tras un `ERROR`
- Operaciones encadenadas con resultado intermedio
- Navegación completa por teclado físico
- Diseño responsivo y accesible (atributos `aria-*`)

## Instalación

```bash
bun install
```

O con npm:

```bash
npm install
```

## Comandos disponibles

### Correr la aplicación en desarrollo

```bash
bun run dev
# o
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### Correr los tests

```bash
bun test
# o
npm test
```

### Correr el linter

```bash
bun run lint
# o
npm run lint
```

### Correr Storybook

```bash
bun run storybook
# o
npm run storybook
```

Abre [http://localhost:6006](http://localhost:6006) en el navegador.

### Build de producción

```bash
bun run build
# o
npm run build
```

## Docker

### Modo desarrollo (con hot-reload)

```bash
docker compose up calculator-dev
```

La app estará disponible en [http://localhost:5173](http://localhost:5173).

### Modo producción (Nginx, build optimizado)

```bash
docker compose --profile production up calculator
```

La app estará disponible en [http://localhost:8080](http://localhost:8080).

### Parar los contenedores

```bash
docker compose down
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Calculator/     # Componente raíz con navegación por teclado
│   ├── CalcButton/     # Botón reutilizable con variantes visuales
│   ├── Display/        # Pantalla de la calculadora
│   └── Keyboard/       # Teclado numérico y de operaciones
├── hooks/
│   └── useCalculator.ts  # Lógica central de la calculadora
├── utils/
│   └── calculator.ts     # Funciones puras de cálculo y formateo
├── stories/              # Historias de Storybook
└── test/
    └── setup.ts          # Configuración de tests
```
