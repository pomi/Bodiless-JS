# Product Schema

JSON-LD following the Product schema is automatically generated for Product Pages.

## Site Builder Details

01. Get data in the component file by setting the schema key desired; for example, to get the
    product name:

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

      SEO: {
        TitleRow: withDesign({
          PageTitle: asSchemaSource('product-name'),
        }),
      },
    ```

    - For schema keys, see [Product Schema Keys](#product-schema-keys).

01. Return data; you should set the schema component in your page:

    ```tsx
    import { WithProductSchema } from '@bodiless/schema-org';

      SEO: {
        PageWrapper: WithProductSchema,
      },
    ```

01. Set provider; you should define the schema provider in your page structure template:

    ```tsx
    import { withStructuredDataProvider } from '@bodiless/schema-org';

      SEO: {
        _: withStructuredDataProvider as Token,
      },
    ```

An example of the returned JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": [
    "Product A"
  ],
  "image": [
    "https://example.com/images/pages/products/product-a/e3f353fe49e7cb8ef65de3b89087ef79/product-pink (1).png"
  ],
  "description": [],
  "sku": [],
  "mpn": [],
  "offers": {
    "@type": "Offer",
    "url": [],
    "priceCurrency": [],
    "price": [
      "0.00"
    ],
    "priceValidUntil": [],
    "itemCondition": [],
    "availability": []
  }
}
```

?> **Note:** The Offer data type is a subset of the Product data type.

For further information regarding the definition of the Product and Offer data types, see:

- **Product:**
  - [Product](https://schema.org/Product) | Schema.org
  - [How To Add Product Structured Data :
    Product](https://developers.google.com/search/docs/advanced/structured-data/product#product) |
    Google Search Central
- **Offer:**
  - [Offer](https://schema.org/Offer) | Schema.org
  - [How To Add Product Structured Data :
    Offer](https://developers.google.com/search/docs/advanced/structured-data/product#offer) |
    Google Search Central

### Product Schema Keys

- `product-name`: The name of the product.
- `product-image`: The image of the product.
- `product-description`: The description of the product.
- `product-sku`: Merchant-specific identifier for product.
- `product-mpn`: The Manufacturer Part Number (MPN) of the product, or the product to which the
  offer refers.
- `product-brand-name`: The brand of the product.
- `product-review-rating-ratingValue`: A numerical quality rating for the item — either a number,
  fraction, or percentage (e.g., "4", "60%", or "6 / 10").
- `product-review-rating-bestRating`: The highest value allowed in this rating system.
  - If `bestRating` is omitted, 5 is assumed.
- `product-review-author-name`: The author of this content or rating.
- `product-aggregateRating-ratingValue`: A numerical quality rating for the item — either a number,
  fraction, or percentage (e.g., "4", "60%", or "6 / 10").
- `product-aggregateRating-reviewCount`: Specifies the number of people who provided a review, with
  or without an accompanying rating.
  - At least one of `ratingCount` or `reviewCount` is required.
- `product-offer-url`: A URL to the product web page (that includes the Offer).
- `product-offer-priceCurrency`: The currency used to describe the product price, in three-letter
  ISO 4217 format.
- `product-offer-price`: The offer price of a product.
- `product-offer-priceValidUntil`: The date (in ISO 8601 date format) after which the price will no
  longer be available.
  - Your product snippet may not display if the `priceValidUntil` property indicates a past date.
- `product-offer-itemOffered`: The item being sold.
  - Typically, this includes a nested product, but it can also contain other item types or free
    text.
- `product-offer-availability`: The availability of this item (e.g., "In stock", "Out of stock",
  "Pre-order", etc.).
