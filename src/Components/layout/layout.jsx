import "./layout.css"
const Layout = ({children})=>{
    return<>
    <div className="container d-flex">
    {children}
    </div>
    </>
}

export default Layout;