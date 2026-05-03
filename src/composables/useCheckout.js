
import { useRouter } from 'vue-router'

const SECRET_KEY = 'qurbanhub2026'

function xorCipher(str, key) {
  return str.split('').map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('')
}

export function encodeParams(data) {
  const jsonStr = JSON.stringify(data)
  const xored   = xorCipher(jsonStr, SECRET_KEY)
  return btoa(xored)
}

export function useCheckout() {
  const router = useRouter()

  function pesanSekarang(item) {
    const payload = {
      id:    item.id,
      name:  item.title,
      price: item.rawPrice,
      share: item.maxShare,
      desc:  item.for,
    }
    const encoded = encodeParams(payload)
    router.push({ path: '/checkout', query: { d: encoded } })
  }

  return { pesanSekarang }
}