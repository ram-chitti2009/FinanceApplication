import PageHeader from "../../../components/page-header";

export default function Layout({children}: {children: React.ReactNode}){
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader className="my-8 " />
            <main className="flex-grow">{children}</main>
            <footer className="text-center py-8"> Footer </footer>
        </div>
    )
}
