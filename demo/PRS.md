# Pull requests de la demo

Títulos y descripciones para abrir cada PR desde su rama hacia `main`. Están
escritos como los escribiría un compañero: no mencionan el error.

## `demo/security`

**Título:** Mostrar reseñas con formato

> Los clientes nos pidieron poder resaltar partes de su reseña. Ahora
> `**texto**` se muestra en negrita y los saltos de línea se respetan.

## `demo/server-action`

**Título:** Respetar en el checkout el precio que vio el cliente

> Si un precio cambia mientras alguien tiene el producto en el carrito, hoy le
> cobramos el precio nuevo. Guardamos el precio al agregar al carrito y el
> checkout usa ese. De paso, el checkout ya no necesita buscar cada producto en
> el catálogo.

## `demo/correctness`

**Título:** Envío gratis desde $50.000

> Promo de este mes: envío gratis en compras desde $50.000. El carrito muestra
> cuánto falta para llegar.

## `demo/cross-file`

**Título:** `formatPrice` recibe centavos

> La API de pagos que vamos a integrar trabaja en centavos. `formatPrice` pasa a
> recibir centavos y el carrito se adapta. Aprovecho para que `PriceTag` pueda
> mostrar un precio anterior tachado.

## `demo/test-gap`

**Título:** Cupones de descuento

> Se puede ingresar un cupón en el carrito. Arrancamos con `MATE10` (10 %) y
> `BIENVENIDA` ($5.000 de descuento).

## `demo/clean`

**Título:** Mejorar textos del catálogo y el carrito

> Ajustes de copy que pidió marketing.
