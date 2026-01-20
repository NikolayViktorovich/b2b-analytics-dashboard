interface Product {
  name: string
  brand: string
  quantity: number
  price: number
  earning: number
}

interface Props {
  products: Product[]
}

const ProductTable = ({ products }: Props) => {
  const card = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '16px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
  }

  const hdr = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexShrink: 0,
  }

  const title = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const wrap = {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
  }

  const tbl = {
    width: '100%',
    borderCollapse: 'collapse' as const,
  }

  const th = {
    textAlign: 'left' as const,
    padding: '12px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--border-color)',
  }

  const td = {
    padding: '16px 12px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
  }

  return (
    <div style={card}>
      <div style={hdr}>
        <div style={title}>Самые продаваемые товары</div>
      </div>

      <div style={wrap}>
        <table style={tbl}>
          <thead>
            <tr>
              <th style={th}>Название товара</th>
              <th style={th}>Бренд</th>
              <th style={th}>Количество</th>
              <th style={th}>Цена</th>
              <th style={th}>Доход</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx}>
                <td style={td}>{product.name}</td>
                <td style={td}>{product.brand}</td>
                <td style={td}>{product.quantity}</td>
                <td style={td}>${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</td>
                <td style={td}>${typeof product.earning === 'number' ? product.earning.toFixed(2) : product.earning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable
