export default function Article(){
    let testy = window.location.href
    let array_url = testy.split('/')
    let name = array_url[array_url.length -1]
    return(
        <div>
            article {name}
        </div>
    )
}