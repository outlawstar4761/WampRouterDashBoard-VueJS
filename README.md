# 🛰️ WAMP Router Dashboard (Vue 3 + Vite)

A real-time dashboard for visualizing and managing a [WAMP](https://wamp-proto.org/) router’s internal state — including sessions, registrations, and subscriptions — using **Vue 3**, **Vite**, and **AutobahnJS**.

This app connects to a running **WAMP router** (such as Crossbar.io) and displays live data using the router’s Meta API.

---

## 🚀 Features

- Real-time visualization of:
  - Active sessions (clients)
  - Registered procedures
  - Subscriptions and topics
  - Subscriber counts
- Event-driven updates for session joins/leaves and registration/subscription lifecycle changes
- Responsive layout for desktop and tablet
- Built entirely on the WAMP Meta API (no server-side components required)

---

## 🧩 Architecture Overview


```

Vue3 Dashboard (Vite)  
│  
├── Connects via WAMP/WebSocket  
│  
├── Subscribes to:  
│ • wamp.session.on_join / on_leave  
│ • wamp.registration.on_create / on_delete  
│ • wamp.subscription.on_create / on_delete / on_subscribe / on_unsubscribe  
│  
└── Calls RPCs:  
• wamp.session.list / get  
• wamp.registration.list / get  
• wamp.subscription.list / get / count_subscribers

```

---

## 🧱 Project Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/yourname/wamp-dashboard.git
cd wamp-dashboard
npm install

```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VITE_WAMP_URL=ws://localhost:8080/ws
VITE_WAMP_REALM=realm1

```

> Adjust the URL and realm to match your router’s configuration.

### 3. Run the development server

```bash
npm run dev

```

Vite will start a local dev server (typically on [http://localhost:5173](http://localhost:5173)).

----------


### 🧠 Key Dependencies

| Package                                                                                                      | Version  | Purpose                                                            |
| ------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------ |
| **[vue](https://vuejs.org/)**                                                                                | ^3.5.12  | Reactive UI framework for building the dashboard’s interface       |
| **[vue-router](https://router.vuejs.org/)**                                                                  | ^4.4.5   | Client-side routing for page navigation                            |
| **[vuex](https://vuex.vuejs.org/)**                                                                          | ^4.1.0   | State management (central store for sessions, registrations, etc.) |
| **[vuetify](https://vuetifyjs.com/)**                                                                        | ^3.10.8  | UI component framework (material design system)                    |
| **[autobahn-browser](https://github.com/crossbario/autobahn-js)**                                            | ^22.11.1 | WAMP client used to connect to the router and handle RPC/pub-sub   |
| **[@outlawdesigns/authenticationclient](https://www.npmjs.com/package/@outlawdesigns/authenticationclient)** | ^2.0.3   | Handles authentication and token-based access to the router        |
| **[axios](https://axios-http.com/)**                                                                         | ^1.7.3   | HTTP client (for API calls if needed)                              |
| **[vue-cookies](https://www.npmjs.com/package/vue-cookies)**                                                 | ^1.8.3   | Cookie management (for storing tokens or user preferences)         |
| **[core-js](https://github.com/zloirock/core-js)**                                                           | ^3.37.0  | Polyfills for modern JavaScript features (browser compatibility)   |
| **[register-service-worker](https://www.npmjs.com/package/register-service-worker)**                         | ^1.7.2   | PWA support; registers a service worker for offline caching        |
| **[@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)**                       | ^3.1.2   | Enables Vue 3 support inside the Vite build pipeline               |
| **[vite](https://vitejs.dev/)**                                                                              | ^3.1.8   | Fast development/build tool with hot module replacement            |


----------

## ⚙️ Build and Deploy

To create a production build:

```bash
npm run build

```

The output will be placed in the `/dist` directory.  
Serve it using any static file host:

```bash
npm install -g serve
serve -s dist

```

----------

## 🧭 Meta API Usage

This dashboard depends on the standard WAMP Meta API.  
It calls or subscribes to the following:

**Procedures**

```
wamp.registration.list
wamp.registration.get
wamp.subscription.list
wamp.subscription.get
wamp.subscription.count_subscribers
wamp.session.list
wamp.session.get

```

**Events**

```
wamp.session.on_join
wamp.session.on_leave
wamp.subscription.on_create
wamp.subscription.on_delete
wamp.subscription.on_subscribe
wamp.subscription.on_unsubscribe
wamp.registration.on_create
wamp.registration.on_delete

```

Ensure your router exposes these procedures and topics as defined in the WAMP specification.

----------

## 🧑‍💻 Contributing

Pull requests are welcome!  
If you extend the dashboard with additional meta-events, filtering, or visualization features, please document them here.

----------

## 🪪 License

MIT License © 2025  
Created by [Outlaw Designs](https://github.com/outlawdesigns-io)

----------
