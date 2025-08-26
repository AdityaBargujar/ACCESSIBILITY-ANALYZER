// "https://i.pinimg.com/236x/f8/9b/be/f89bbea135ee0db021d447fa2aba8600.jpg"
// "https://i.pinimg.com/236x/5c/d5/df/5cd5dff3885a90f10684a43325e3de8a.jpg"
// "https://i.pinimg.com/236x/2f/5a/d2/2f5ad2bb24fde7148466640808ca34cb.jpg"
// "https://i.pinimg.com/236x/ef/52/db/ef52dbbc03dc9cd8040bd99040a06ee2.jpg"
// "https://i.pinimg.com/474x/85/77/c3/8577c3e4d07b3d80e3b692e9315963db.jpg"
// "https://i.pinimg.com/236x/9d/1c/5f/9d1c5f6e6bf8726935b42a0ed68d01d6.jpg"
arr = ["https://i.pinimg.com/236x/f8/9b/be/f89bbea135ee0db021d447fa2aba8600.jpg","https://i.pinimg.com/236x/5c/d5/df/5cd5dff3885a90f10684a43325e3de8a.jpg","https://i.pinimg.com/236x/2f/5a/d2/2f5ad2bb24fde7148466640808ca34cb.jpg","https://i.pinimg.com/236x/ef/52/db/ef52dbbc03dc9cd8040bd99040a06ee2.jpg","https://i.pinimg.com/474x/85/77/c3/8577c3e4d07b3d80e3b692e9315963db.jpg","https://i.pinimg.com/236x/9d/1c/5f/9d1c5f6e6bf8726935b42a0ed68d01d6.jpg"]

let main = document.getElementById("main")
let s=""

for(let i=1;i<=44;i++){
    let r =Math.ceil(Math.random()*5)
    s=s+`<div class="card"><img src=${arr[r]}></div>`
}
main.innerHTML = s;