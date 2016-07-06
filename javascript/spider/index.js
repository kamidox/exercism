function greetingMsg(name, callback) {
    callback(`Hello ${name}!`);
}

greetingMsg('Joey', msg => console.log(msg));
