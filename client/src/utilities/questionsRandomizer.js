export default function questionsRandomizer(arr) {
    var newSet = new Set()
    for (let i = 0; i< arr.length; i++){
        newSet.add(arr[Math.floor(Math.random()*arr.length)])               
                if(newSet.size === 5) {
                 break
            }
    }
        return Array.from(newSet)
}

