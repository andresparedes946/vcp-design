# VCP Design — sitio del estudio

Portfolio de VCP Design (Apps · Web · SaaS), construido con Next.js 15, React 19,
Tailwind CSS 4 y Motion.

```bash
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build de producción
npm run start   # servir el build
npm run lint
```

---

## Qué editar

Casi todo el contenido vive en un solo archivo: **`src/lib/site.ts`**. No hace
falta tocar componentes para cambiar textos, servicios, proyectos o datos de
contacto.

| Qué querés cambiar | Dónde |
| --- | --- |
| Teléfono, email, ubicación, año de fundación | `site` |
| Número y mensaje de WhatsApp | `whatsapp` |
| Secciones del menú | `nav` |
| Servicios, entregables y plazos | `services` |
| Proyectos del portfolio | `projects` |
| Tecnologías (marquesina y listado) | `stackMarquee`, `stackGroups` |
| Etapas del proceso | `steps` |
| Números y principios del estudio | `stats`, `principles` |
| Testimonios | `testimonials` |
| Opciones del formulario | `projectTypes`, `budgets` |

### Contenido de ejemplo — reemplazar

Los proyectos y testimonios están marcados con `placeholder: true` en
`src/lib/site.ts`. **Son inventados para que el sitio se pueda ver terminado.**
Cambialos por casos reales antes de publicar y borrá la bandera `placeholder`.

Lo mismo con `stats`: los números (40+ productos, 94% de clientes que vuelven)
son de muestra.

### Agregar capturas a los proyectos

Cada proyecto acepta un campo opcional `image`:

```ts
{
  id: "nexo",
  name: "Nexo Logística",
  image: "/proyectos/nexo.png",   // el archivo va en public/proyectos/
  // ...
}
```

Sin `image`, se dibuja un panel generado con el color del proyecto — preferible
a un mockup falso. Con `image`, se carga la captura con un skeleton real
mientras llega. Proporción recomendada: **16:10**.

### Dominio

De la URL del sitio salen la dirección canónica, el sitemap y las etiquetas
Open Graph — o sea, la tarjeta que se ve cuando alguien comparte el link por
WhatsApp o LinkedIn. **No hay que tocar código para configurarla.** `siteUrl`
en `src/lib/site.ts` la resuelve en cascada:

1. `NEXT_PUBLIC_SITE_URL`, si está cargada.
2. La URL de producción que Vercel asigna sola (`vcp-design.vercel.app`).
3. `http://localhost:3000` en desarrollo.

Cuando tengas dominio propio, cargá la variable en Vercel → Settings →
Environment Variables, entorno **Production**, y volvé a desplegar. Sin barra
final. Ver `.env.example`.

---

## Cómo está armado

```
src/
├─ app/
│  ├─ layout.tsx            Fuentes, metadata, chrome del sitio
│  ├─ page.tsx              Orden de las secciones
│  ├─ globals.css           Tokens de diseño y primitivas
│  ├─ icon.png              Favicon (generado del isologo)
│  ├─ apple-icon.png        Ícono de iOS
│  ├─ opengraph-image.png   Tarjeta para redes (1200×630)
│  ├─ not-found.tsx         404
│  ├─ robots.ts · sitemap.ts
│
├─ components/
│  ├─ Logo.tsx              Isologo en SVG (vectorial, animable)
│  ├─ Preloader.tsx         Pantalla de carga + contexto `useSiteReady`
│  ├─ AmbientBackground.tsx Auroras, retícula, partículas y grano
│  ├─ CustomCursor.tsx      Cursor personalizado
│  ├─ Nav.tsx               Header y menú móvil
│  ├─ ScrollProgress.tsx    Barra de lectura y riel de secciones
│  ├─ WhatsAppFab.tsx       Botón flotante
│  ├─ Magnetic.tsx          Botones magnéticos con ripple
│  ├─ Reveal.tsx            Scroll reveal, stagger, parallax, WordReveal
│  ├─ SpotlightCard.tsx     Halo que sigue al puntero
│  ├─ Counter.tsx           Números que cuentan al entrar en pantalla
│  ├─ ProjectVisual.tsx     Captura con skeleton, o panel generado
│  ├─ Section.tsx           Contenedor y encabezado de sección
│  └─ sections/             Hero, Services, Work, Stack, Process,
│                           About, Testimonials, Contact, Footer
└─ lib/site.ts              Todo el contenido
```

### Decisiones de diseño

**El isologo es SVG, no PNG.** `Logo.tsx` reconstruye la marca en vectores para
que escale sin pérdida y para poder animar el trazo del anillo en el preloader.
El PNG original (`VCPDesign.png`) se usa donde corresponde un mapa de bits:
favicon, ícono de iOS, tarjeta de Open Graph y la pieza de marca de la sección
Estudio.

**Una sola familia tipográfica.** El contraste entre titulares y cuerpo lo da el
eje de ancho variable de Archivo —titulares expandidos, cuerpo a ancho normal—
igual que el lettering del isologo. JetBrains Mono queda como voz utilitaria:
etiquetas, índices y datos.

**La elipsis del glifo `⟨ ··· ⟩` es el lenguaje de "en progreso"** del sitio:
aparece en el preloader, en el riel de secciones y en el estado de carga del
formulario. Un solo motivo, tres apariciones.

**Sólo el proceso está numerado.** Las secciones no son una secuencia, así que
un `01 / 02 / 03` no diría nada. En el proceso sí: no se puede desarrollar antes
de diseñar.

### El formulario de contacto

No hay backend. El formulario arma un mensaje con lo que cargaste y abre
WhatsApp con todo redactado — llega al mismo lugar que el botón flotante, pero
con el contexto del proyecto adentro.

Si más adelante querés recibirlo por correo, reemplazá el `onSubmit` de
`src/components/sections/Contact.tsx` por un `fetch` a un endpoint (Resend,
Formspree o un Route Handler propio).

### Rendimiento y accesibilidad

- El canvas de partículas limita el DPR a 1.5, escala la densidad al área de la
  pantalla y **se detiene cuando la pestaña no está visible**.
- `prefers-reduced-motion` apaga el fondo animado, el cursor personalizado, el
  magnetismo, el ripple y el preloader.
- Navegación completa por teclado, foco visible, enlace de salto al contenido y
  etiquetas en todos los campos del formulario.

---

## Publicar

Repositorio: <https://github.com/andresparedes946/vcp-design>

**Vercel** es el camino recomendado — es el mismo equipo que hace Next.js y el
proyecto no necesita ninguna configuración extra.

Conviene importarlo desde el dashboard y no desde la CLI: al quedar vinculado
al repositorio, **cada `git push` a `main` despliega solo**, y cada rama genera
una URL de vista previa para revisar cambios antes de publicarlos.

1. Entrar a <https://vercel.com/new> con la cuenta de GitHub.
2. Importar `andresparedes946/vcp-design`.
3. No cambiar nada: Vercel detecta Next.js y usa `npm run build`.
4. Deploy.

Desde la CLI, si preferís: `npx vercel login` y después `npx vercel --prod`.

Cualquier hosting con Node 18+ también sirve: `npm run build` y `npm run start`.

### Antes de publicar

1. Reemplazar proyectos, testimonios y números de ejemplo en `src/lib/site.ts`
   (los marcados con `placeholder: true`).
2. Confirmar el email de contacto (hoy: `vcpdesign@outlook.com.ar`).
3. El dominio no requiere ningún cambio para desplegar — ver **Dominio** arriba.
