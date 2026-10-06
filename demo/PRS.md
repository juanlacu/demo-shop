# Pull requests de la demo

Títulos y descripciones para abrir cada PR desde su rama hacia `main`. Están
escritos como los escribiría un compañero: no mencionan el error.

## `demo/security`

**Title:** Show reviews with basic formatting

> Customers asked to be able to highlight parts of their reviews. `**text**` now renders in bold and line breaks are kept.

## `demo/server-action`

**Title:** Charge the price the customer saw when adding to the cart

> If a price changes while a product sits in someone's cart, we currently charge the new price. The cart now stores the price when the product is added and checkout uses it. As a bonus, checkout no longer needs to look up every product in the catalog.

## `demo/correctness`

**Title:** Free shipping on orders from $50.000

> This month's promo: free shipping on orders from $50.000. The cart shows how much is left to qualify.

## `demo/cross-file`

**Title:** `formatPrice` takes cents

> The payments API we're about to integrate works in cents. `formatPrice` now takes cents and the cart is updated accordingly. I also let `PriceTag` show a crossed-out previous price.

## `demo/test-gap`

**Title:** Add discount coupons

> Customers can enter a coupon in the cart. We're starting with `MATE10` (10% off) and `BIENVENIDA` ($5.000 off).

## `demo/clean`

**Title:** Polish catalog and cart copy

> Copy tweaks requested by marketing.
