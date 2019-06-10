const justify = require('justified');

function main() {
    let limit = 40;
    let example = `In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters. 
                   And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light "day," and the darkness he called "night." And there was evening, and there was morning - the first day.`;

    if (process.argv[2])
        example = process.argv[2];
    if (process.argv[3])
        limit = process.argv[3]

    const text = formattText(example, limit);
    console.log(justify(text));
}

function formattText(text, limit) {
    let lines = [];
    let count = 0;
    let line = '';
    const text_split = text.split('\n');

    text_split.forEach((text_line, index) => {
        for (let i = 0; i < text_line.length; i++) {
            if (count == limit) {
                let b = count;
                while (text_line[i] != ' ') {
                    b = b - 1;
                    i--;
                }

                lines.push(line.trim().substring(0, b));
                line = '';
                count = 0;
                continue;
            }
            line += text_line[i];
            count++;
        }

        lines.push(line.trim());
        if (index != text_line.length - 1)
            lines.push('');

        line = '';
        count = 0;
    });

    return lines.join('\n');
}

main();

module.exports = { main, formattText }