const question_score = {
    'fever': 3,
    'dry cough': 3,
    'exhausting': 3,
    'shortness of breath': 3,
    'pain in chest': 3,
    'pains and soreness': 2,
    'sore throat': 2,
    'diarrhea': 2,
    'a headache': 2,
    'cough': 1,
    'sneezing': 1,
    'chest seizures': 1,
}

const call_init = () => {
    Object.keys(question_score).forEach((question,_) => {
        const question_container = document.createElement('div')
        const question_text = document.createElement('h1')
        const question_check_box = document.createElement('input')
        const breaker = document.createElement('hr')
        question_container.className = 'question'
        question_text.innerText = question
        question_check_box.type = 'checkbox'
        question_container.appendChild(question_text)
        question_container.appendChild(question_check_box)
        document.getElementById('main_container').appendChild(question_container)
        document.getElementById('main_container').appendChild(breaker)
    })
    const submit_button = document.createElement('button')
    submit_button.innerText = "get my result"
    submit_button.className = "success_button"
    submit_button.onclick = handle_submit
    document.getElementById('main_container').appendChild(submit_button)
}

const get_result = () => {
    const question_elements = document.querySelectorAll('.question')
    let final_score = 0
    for (question_element of question_elements) {
        const question = question_element.children[0].innerText
        const answer = question_element.children[1].checked
        if (answer) 
            final_score += question_score[question.toLowerCase()]
    }
    let total_score = Object.values(question_score)
        .reduce((total_score, curr_score) => (total_score + curr_score), 0)
    const positive_present = parseInt((final_score / total_score)*100)
    return positive_present
}

const handle_submit = () => {
    const positive_present = get_result()
    // console.log("Test Result", positive_present)
    if(positive_present === 0) return
    const result_container_wrap = document.getElementById('result_container_wrap')
    const result_container = document.getElementById('result_container')
    const test_result = document.createElement('h2')
    test_result.innerText = `You are ${positive_present}% positive` // test result message
    result_container.insertBefore(test_result, result_container.children[1])
    result_container_wrap.style = 'display:block'
}

const reset = () => {
    const main_container_children = document.getElementById('main_container').childNodes
    for (let child of main_container_children) {
        if (child.className === 'question') {
            for (let question_child of child.childNodes) {
                if (question_child.nodeName === 'INPUT')
                    question_child.checked = false
            }
        }
    }
    const result_container_wrap = document.getElementById('result_container_wrap')
    const result_container = document.getElementById('result_container')
    result_container.removeChild(result_container.children[1])
    result_container_wrap.style = 'display:none'
}

call_init()
