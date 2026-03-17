'use client'

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            style={{ color: '#16a34a', cursor: 'pointer', background: 'none', border: 'none', font: 'inherit' }}
        >
            🖨 Print
        </button>
    )
}