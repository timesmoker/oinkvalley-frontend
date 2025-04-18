// app/(default)/layout.tsx
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
        <main className="flex-grow">{children}</main>
            <Footer />
            </>
    )
}
