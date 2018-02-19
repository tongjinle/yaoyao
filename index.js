let ques;
let answCount = 10;
let isRun = true;
let score = 0;
$(function() {
    refresh();
});
$('#answer').on('click','.item', function() {
    if(!isRun){
        return;
    }
    answCount--;
    let choice = $(this).text();
    ques.choice = choice;
    let flag = choice == ques.c;
    if(flag){score+=10;}
    writeHistory(flag);

    if(!answCount){
        alert(`你一共本次测试是${score}分`);
        isRun = false;
        return;
    }

    refresh();

});

$('#next').on('click', function() {
    refresh();
});


function writeHistory(flag) {
    let node = $('#history');
    let subNode = $('<div/>').addClass('item');
    subNode.text(`${ques.a}+${ques.b}=${ques.choice}`);
    if(!flag){
        subNode.addClass('wrong')
    }
    node.append(subNode);
}

function refresh() {
    ques = getQuestion();
    render(ques);
}

function render(ques) {
    {
        let node = $('#question');
        node.find('.bjs').text(ques.a);
        node.find('.js').text(ques.b);
    }

    {
        let node = $('#answer');
        if (!node.find('.item').length) {
            let count = 4;
            while (count--) {
                node.append('<div class="item"></div>');
            }
        }

        node.find('.item').each((i, n) => {
            $(n).text(ques.d[i]);
        });

    }
}

function getQuestion() {
    let flag = false;
    let a, b, c, d;
    while (!flag) {
        a = rndNum();
        b = rndNum();
        c = a + b;
        if (c <= 10) {
            flag = true;
        }

        let count = 3;
        d = [c];
        while (count) {
            let e = rndNum();
            if (d.every(n => n != e)) {
                d.push(e);
                count--;
            }
        }
        d = d.sort(()=>.5-Math.random());

    }

    return {
        a,
        b,
        c,
        d
    };
}

function rndNum() {
    return Math.floor((Math.random() * 10));
}