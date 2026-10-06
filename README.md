# Mateando · demo de Jev Review

Una tienda mínima en Next.js armada para mostrar
[Jev Review](https://github.com/juanlacu/jev-review): una GitHub Action que
revisa cada pull request con [TypeSafe Jev](https://typesafe.ai) y deja los
hallazgos como comentarios en la línea exacta del código.

La app es a propósito simple (catálogo, detalle, carrito y checkout) para que
la atención quede en la revisión, no en el dominio. Las ramas `demo/*` traen
cambios que parecen razonables pero esconden errores típicos que un revisor
apurado aprueba.

## Qué es Jev

Jev es la API de TypeSafe para pedirle a un modelo **decisiones acotadas y
tipadas** (elegir una opción, dar un puntaje) en lugar de texto libre. Jev
Review usa esas decisiones como pasos chicos de un pipeline y deja la lógica
(umbrales, qué se publica, qué bloquea) en código:

```text
matriz de riesgo
  -> perfil de cada archivo (Choice + Score)
  -> selección de evidencia: qué hunk del diff mirar (Choice)
  -> clasificación del mecanismo del error (Choice)
  -> severidad (Score)
  -> ruteo al revisor que corresponde (Choice)
```

Por cada archivo cambiado lee el archivo completo y los cambios de los archivos
relacionados (los que importa o lo importan), así que puede marcar un cambio que
choca con otro cambio del mismo PR. Revisa correctitud, seguridad,
confiabilidad, compatibilidad y falta de tests.

## Cómo se instala la action

1. Agregá `.github/workflows/jev-review.yml`:

   ```yaml
   name: Jev Review
   on: pull_request

   permissions:
     contents: read
     pull-requests: write

   jobs:
     review:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: juanlacu/jev-review@main
           with:
             typesafe-api-key: ${{ secrets.TYPESAFE_API_KEY }}
   ```

2. Cargá la API key de TypeSafe en **Settings → Secrets and variables →
   Actions** como `TYPESAFE_API_KEY`.

3. Abrí un pull request. La action publica una única review con un comentario
   por hallazgo.

Inputs opcionales: `path` (revisar solo una carpeta) y `fail-on-blocking: "true"`
(hace fallar el job cuando un hallazgo pide cambios; combinado con una regla de
protección de rama, bloquea el merge).

Los PRs que vienen de forks no reciben secrets, así que ahí la revisión no corre:
pusheá ramas al mismo repo.

## Los PRs de la demo

Cada rama sale de `main` con un solo commit. Los títulos y descripciones para
abrir cada PR están en [`demo/PRS.md`](demo/PRS.md).

| Rama | El PR dice… | Lo que debería marcar Jev |
| --- | --- | --- |
| `demo/security` | Reseñas con formato | El texto de las reseñas (escrito por clientes) se inyecta como HTML → XSS |
| `demo/server-action` | El checkout respeta el precio del carrito | La Server Action cobra el precio que manda el navegador → cualquiera paga lo que quiere |
| `demo/correctness` | Envío gratis desde $50.000 | Usa `>` en vez de `>=`: con $50.000 justos cobra el envío, y el aviso del carrito dice lo contrario |
| `demo/cross-file` | `formatPrice` pasa a recibir centavos | `PriceTag` también cambió pero sigue mandando pesos → el catálogo muestra precios 100 veces más chicos |
| `demo/test-gap` | Cupones de descuento | Lógica nueva de descuentos sin ningún test |
| `demo/clean` | Mejorar textos | Solo textos: no debería comentar nada |

Para mostrar que no repite comentarios, después de que corra la review en
`demo/security` pusheá un commit vacío:

```bash
git switch demo/security
git commit --allow-empty -m "Retrigger review"
git push
```

La action vuelve a correr y no comenta otra vez las líneas que ya comentó.

## Regenerar las ramas

Las ramas se crean desde los parches en `demo/patches/`:

```bash
scripts/demo-branches.sh          # crea las ramas demo/* sobre main
scripts/demo-branches.sh --push   # además las pushea a origin (con --force)
```

Si ya abriste los PRs y querés repetir la demo, cerralos, corré el script con
`--push` y abrilos de nuevo.

## Correr la app

Requiere Node.js 24+.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tests de lib/
npm run typecheck
```
