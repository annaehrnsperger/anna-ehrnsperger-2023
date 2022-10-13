<template>
  <button @click="onAddToCart">Add to cart</button>
</template>

<script>
export default {
  methods: {
    onAddToCart() {
      const checkoutId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI=' // ID of an existing checkout
      const lineItemsToUpdate = [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=',
          quantity: 2,
        },
      ]

      this.$shopify.checkout
        .updateLineItems(checkoutId, lineItemsToUpdate)
        .then((checkout) => {
          // Do something with the updated checkout
          console.log(checkout.lineItems) // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        })
    },
  },
}
</script>
