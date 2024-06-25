import Sidenavbar from "../components/Sidenavbar"


export default function ProfileLayout({ children }) {
  return <div className="flex h-screen">
  <Sidenavbar className="w-64 flex-shrink-0" />
  <main className="flex-grow overflow-auto">
    {children}
  </main>
</div>
}