// --- Declare JSX Intrinsic Element using the manually defined props interface ---
declare global {
  namespace JSX {
    interface IntrinsicElements {
      emergeMaterial: EmergeMaterialProps // Use the defined props interface
    }
  }
}
