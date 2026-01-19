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
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  }

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--border-color)',
  }

  const tdStyle: React.CSSProperties = {
    padding: '16px 12px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Самые продаваемые товары</div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Название товара</th>
            <th style={thStyle}>Бренд</th>
            <th style={thStyle}>Количество</th>
            <th style={thStyle}>Цена</th>
            <th style={thStyle}>Доход</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td style={tdStyle}>{product.name}</td>
              <td style={tdStyle}>{product.brand}</td>
              <td style={tdStyle}>{product.quantity}</td>
              <td style={tdStyle}>${product.price.toFixed(2)}</td>
              <td style={tdStyle}>${product.earning.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
