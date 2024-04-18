class PersonalTest {
    constructor(target) {
        this.container = document.querySelector(target); // 추후 dom 내용을 바꾸기 위한 선택자
        this.page = 0; // 0: intro, 1: test, 2: result 현재 페이지
        this.progress = 0; // 현재 질문 단계
        this.questions = {
            IE: [{ question: '친구와 만나기로 했는데 갑자기 약속이 취소되면?', answer: { a:'혼자만의 시간이 생겼다! 신나ㅎㅎ', b: '앗 그럼 누구 만나지?'} }],
            SN: [{ question: '멍 때릴 때 내가 하는 생각은?', answer: { a: '아무 생각이 없다', b: '여러가지 잡생각' } }],
            TF: [{ question: '친구가 우울해서 미용실에 갔다 왔다고 한다', answer: { a: '머리 뭐 했어?', b: '왜 우울해? 무슨 일 있었어?' } }],
            JP: [{ question: '내 카카오톡 상태는?', answer: { a: '읽지 않은 알람이 거의 없다', b: '읽지 않은 알람이 매우 많다' } }],
        }; // 질문 모음
        this.results = []; // 사용자가 선택한 답모음
        this.resultInfors = {
            ISTJ: {
                title: "청렴결백 논리주의자",
                desc: "원리원칙적, 계획적<br /> 즉흥적인거, 약속 어기는거 싫어함<br />" +
                    "나혼자 하는게 제일 편하고 제일 빠름.<br /> 내 일과 의견에 간섭받는 거 싫어함. <br />" +
                    "남한테 관심 별로 없는 편.<br /> 책임감 많음.<br /> 철벽 잘 침. <br />" +
                    "시작했으면 목표한거 끝내야함."
            },
            ISFJ: {
                title: "용감한 수호자",
                desc: "원칙주의자.<br /> 남 눈치봄, 남들 챙기는 거 좋아함.<br />" +
                    "외로움 많이 타는데 많은 사람이랑 있는건 싫음.<br /> 게으른 완벽주의자.<br />" +
                    "배려심 많고 공감 잘해줌.<br /> 인간관계에 스트레스 많이 받음.<br /> 겉으론 무덤덤해보여도 속으론 온갖 생각 다 함. <br />" +
                    "성격 온화, 하자고 하면 거의 다 해줌."
            },
            INFJ: {
                title: "선의의 옹호자",
                desc: "생각이 너무 많음.<br /> 새로운 일 시작하는거, 새로운 사람 만나는거 싫어함.<br />" +
                    "겉으로 웃는데 속으로 욕 많이 함.<br /> 할거 미리 해치우는 편. <br />" +
                    "나 혼자 생각할 시간 꼭 필요.<br /> 내가 하고싶은건 열심히 함 특히 예술쪽으로 감수성 풍부.<br /> " +
                    "계획적인거 좋아함. <br /> 내 사람한테는 매우 잘해줌."
            },
            INTJ: {
                title: "용의주도한 전략가",
                desc: "원리원칙적, 계획적<br /> 근데 단체활동할 때 주도적인 역할 자주 맡음.<br />" +
                    "하루하루 세세하게 계획짜놓고 지내는 것 좋아함.<br /> 돈관리도 잘 하는 편, 사실과 원리원칙 중요. <br />" +
                    "감정에 휘둘리는 거 싫어함.<br /> 문제 해결에 도움은 줘도 위로 자체는 잘 못함.<br />" +
                    " 인간관계 정리 잘 하고 사람에게 정 붙이는데 시간 오래 걸림.<br />" +
                    "완벽주의자."
            },
            ISTP: {
                title: "만능 재주꾼",
                desc: "만사가 귀찮음.<br /> 남한테 관심 없고 내 얘기도 잘 안함.<br />" +
                    "혼자만의 문화생활 즐김.<br /> 카톡 할말없으면 읽씹, 대화 이어가기 안함.<br />" +
                    "기계조작 잘하고 재미있어함.<br /> 위계질서 싫어하고 간섭 받는거 싫어함.<br /> " +
                    "공감능력 부족. <br />" +
                    "관찰력 뛰어남, 멀티 안됨, 호불호 강함."
            },
            ISFP: {
                title: "호기심 많은 예술가",
                desc: "집순이, 집돌이.<br /> 약속 있었는데 취소되면 속으로 기뻐함.<br />" +
                    "칭찬 받으면 그거 하루종일 생각남.<br /> 갈등, 불화 싫어함.<br />" +
                    "친해지면 활발함.<br /> 남한테 속마음 얘기 잘 안함.<br /> 양보를 잘함.<br />" +
                    "인간관계에 신경 많이 쓰는 편."
            },
            INFP: {
                title: "열정적인 중재자",
                desc: "이상주의적.<br /> 완벽하게 하지 못할거면 아예 시작을 안함.<br />" +
                    "내적 성장 엄청 중요하게 여김.<br /> 화날 때 혼자 있어야 함 누가 건들면 안됨. <br />" +
                    "한번 싫은건 끝까지 싫음.<br /> 인간관계에 예민함.<br /> 남얘기 잘 들어주는 척 하는데 사실 딴 생각함. <br />" +
                    "남한테 폐 끼치는 거 제일 싫어함."
            },
            INTP: {
                title: "논리적인 사색가",
                desc: "자발적 아웃사이더.<br /> 혼자 있는게 제일 편하고 행복.<br />" +
                    "분석, 추리 좋아함, 생각 많음.<br /> 논리력 부족한, 어리석은 사람들 보면 화가 너무 남. <br />" +
                    "인간은 싫지만 흥미로운 존재라고 생각.<br /> 지식에 대한 욕망 강함.<br /> 시작하면 끝을 봐야함.<br />" +
                    "자기주관 뚜렷, 호불호 확실 감수성 풍부."
            },
            ESTP: {
                title: "모험을 즐기는 사업가",
                desc: "외로움 잘 탐.<br /> 표현을 많이 함.<br />" +
                    "모임에서 어느새 내가 분위기 주도하고 있음.<br /> 리더쉽 있음. <br />" +
                    "남한테 관심 없고 생각하는것도 귀찮음.<br /> 스트레스 잘 안받음.<br />" +
                    "손재주 좋음. <br />" +
                    "밖에서 사람 만나는거 좋아하지만 게을러서 나가기까지가 싫음."
            },
            ESFP: {
                title: "자유로운 영혼의 연예인",
                desc: "성격 매우 급함.<br /> 생각없이 잘삼.<br />" +
                    "하고싶다고 생각한거 다 해야됨 근데 하기싫은건 끝까지 미룸.<br /> " +
                    "모임장소에서 침묵 흐르는거 제일 싫어함.<br />" +
                    "사람의 단점보단 장점을 보려하고 싸움보단 평화가 좋음.<br /> " +
                    "사교성 좋음.<br /> 모든게 내 위주.<br />" +
                    "혼자 있으면 지루해서 뭔가를 계속 하고 있어햐 함."
            },
            ENFP: {
                title: "재기발랄한 활동가",
                desc: "생각 많음, 고집 셈.<br /> 일머리 있음.<br />" +
                    "흥미있고 관심있는건 열정적 그러나 관심 없는건 별로 알고 싶어하지도 않음.<br /> " +
                    "매번 나서서 하진 않는데 아무도 안 나서면 답답해서 나서는 스타일.<br />" +
                    "남 얘기에 리액션을 잘 해줘서 고민상담 하는 애들 많음.<br /> " +
                    "새롭게 친구 사귀는 거 좋아함.<br /> 무계획, 즉흥적인 편.<br />" +
                    "내가 하고싶은거 꼭 해야함."
            },
            ENTP: {
                title: "논쟁을 즐기는 변론가",
                desc: "혼자서 돌아다니는게 제일 편함.<br /> 독립심 강함.<br />" +
                    "밖에 놀러가면 진짜 잘 노는데 집 안에 있는것도 좋음.<br /> " +
                    "변덕 심함, 자기애 강함.<br />" +
                    "직설적이고 솔직하게 내 맘을 표현하는 것에 거리낌이 없음.<br /> " +
                    "지나간 일에 후회가 없음, 그래서 힘든 일 있어도 빨리 털어내는 편.<br /> " +
                    "사람한테 가장 힐링받고 사람한테 가장 스트레스 받음. <br />" +
                    "다방면에 적당한 재능, 근데 다 잘하는데 엄청 잘하진 않음."
            },
            ESTJ: {
                title: "엄격한 관리자",
                desc: "고집 셈, 현실적, 이성적, 직설적.<br /> 호불호 확실.<br />" +
                    "리더 맡는거 싫어하는데 막상 하면 잘함.<br /> 나가서 노는 것보다는 이것저것 배우는게 좋음.<br />" +
                    "시간약속 어기는 거 싫고 즉흥적인거 싫음.<br /> 뭐든 확실한 게 좋음.<br /> 남에게 관심없고 오로지 나한테만 집중.<br />" +
                    "누가 일 못하는 거 못 보고 차라리 그럴바에 내가 두세배로 일 다 해놓음."
            },
            ESFJ: {
                title: "사교적인 외교관",
                desc: "생각보다 철저함.<br /> 혼자 계획 세우고 그 계획 틀어지는 거 싫어함.<br />" +
                    "남 눈치 많이 봄.<br /> 상담, 고민 들어주는 거 잘함.<br />" +
                    "친구, 가족 내 주변 인물들 다 챙김.<br /> 어디 나가면 어색한거 못참고 먼저 말 검.<br /> " +
                    "책 읽고 영화보는거 좋아함. <br />" +
                    "인간관계에서 상처받아도 그 사람 배려한다고 얘기 못함."
            },
            ENFJ: {
                title: "정의로운 사회운동가",
                desc: "사람들을 이끄는 것에 타고난 기질이 있고 좋아하기도 함.<br /> " +
                    "사람을 되게 좋아함.<br />" +
                    "많은 사람들의 신뢰를 받는 성격.<br /> 센스있고 눈치가 빠름.<br />" +
                    "계획짜는거 좋아함.<br />단순함.<br /> 멘탈 강함. <br />" +
                    "남들 눈치봄 남들 신경쓰고 잘해주려하는데 그만큼 상처도 받음."
            },
            ENTJ: {
                title: "대담한 통솔자",
                desc: "팀플하면 결국 총대매고 내가 함.<br /> 누구한테 의존하거나 의지하는 스타일 아님.<br />" +
                    "오직 세상에 믿을 사람은 나 하나.<br /> 불도저 같은 경향.<br />" +
                    "피해 주는거, 피해 받는거 싫어하고 남 일에 노관심.<br /> 감정적 공감 안됨.<br /> 자기애 강함.<br />" +
                    "새로운 사람 만나는 거 좋아하지만 깊은 관계 맺는건 별로 안좋아함."
            },
        }
        this.init();
    }

    init() {
        this.questionArray = this.getQuestion(); // 질문을 배열로 저장

        const answerAButton = this.container.querySelector('button[data-answer="a"]');
        const answerBButton = this.container.querySelector('button[data-answer="b"]');
        const startButton = this.container.querySelector('button[data-action="start"]');
        const restartButton = this.container.querySelector('button[data-action="restart"]');

        answerAButton.addEventListener('click', () => this.submitAnswer(answerAButton.innerText));
        answerBButton.addEventListener('click', () => this.submitAnswer(answerBButton.innerText));
        startButton.addEventListener('click', this.start.bind(this));
        restartButton.addEventListener('click', this.restart.bind(this));

        this.render();
    }

    start() {
        if(this.progress !== 0) return; // 진행중이면 실행하지 않음

        this.page = 1;
        this.render();
    }

    restart() {
        this.page = 0;
        this.progress = 0;
        this.results = [];
        this.render();
    }

    getQuestion() { // questions의 키를 참조해서 질문을 반환
        return Object.entries(this.questions)
        .flatMap(([type, questions]) => questions.map(question => ({ ...question, type })));

    }

    getCurrentQuestions() { // 현재 progress의 질문을 반환
        const currentQuestionIndex = this.progress;
        return this.questionArray[currentQuestionIndex];

    }

    submitAnswer(answer) {
        const currentQuestion = this.questionArray[this.progress];

        if (this.questionArray.length <= this.progress + 1) {
            this.page = 2;
            this.render();
        }

        const selectedAnswer = Object.keys(currentQuestion.answer)
            .find(selectedAnswer => currentQuestion.answer[selectedAnswer] === answer);

        this.results.push({
            type: currentQuestion.type,
            answer: selectedAnswer
        });

        this.progress++;
        this.render();

        return this.getCurrentQuestions();

    }

    calcResult() {
        const totalResult = Object.keys(this.questions).reduce((acc, cur) => {
            acc[cur] = this.results
                .filter(result => result.type === cur)
                .reduce((acc, cur) => {
                    acc[cur.answer] = acc[cur.answer] ? acc[cur.answer] + 1 : 1;
                    return acc;
                }, {});
            return acc;
        }, {});

        return this.createPersonalResult(totalResult);

    }

    createPersonalResult(totalResult) {
        return Object.keys(totalResult).reduce((acc, cur) => {
            const result = totalResult[cur];

            if (!result.a) return acc + cur[1];
            if (!result.b) return acc + cur[0];

            if (result.a === result.b) {
                return acc + cur[0];
            }

            return acc + (result.a > result.b ? cur[0] : cur[1]);
        }, "");

    }


    render() {
        const introContainer = this.container.querySelector('.intro_container');
        const testContainer = this.container.querySelector('.test_container');
        const resultContainer = this.container.querySelector('.result_container');

        if (this.page === 0) {
            introContainer.classList.add('active');
            testContainer.classList.remove('active');
            resultContainer.classList.remove('active');

        } else if (this.page === 1) {
            testContainer.classList.add('active');
            introContainer.classList.remove('active');
            resultContainer.classList.remove('active');

            const progressElement = this.container.querySelector('.progress');
            const questionElement = this.container.querySelector('.question');
            const answerAElement = this.container.querySelector('button[data-answer="a"]');
            const answerBElement = this.container.querySelector('button[data-answer="b"]');

            progressElement.textContent = `Q${this.progress + 1}. `;
            questionElement.textContent = this.getCurrentQuestions().question;
            answerAElement.textContent = this.getCurrentQuestions().answer.a;
            answerBElement.textContent = this.getCurrentQuestions().answer.b;

        } else if (this.page === 2) {
            resultContainer.classList.add('active');
            introContainer.classList.remove('active');
            testContainer.classList.remove('active');

            const resultTextElement = this.container.querySelector('.result_text');
            const resultInforTitleElement = this.container.querySelector('.result_infor_title');
            const resultInforElement = this.container.querySelector('.result_infor');
            const calcResult = this.calcResult();

            resultTextElement.innerHTML = `당신의 성향은 <span class="point_text">${calcResult}</span>입니다.`;
            resultInforTitleElement.innerHTML = `[ ${this.resultInfors[calcResult].title} ]`;

            resultInforElement.innerHTML = this.resultInfors[calcResult].desc
            .split('<br />')
            .map(el => `<li>${el}</li>`)
            .join('');
        }

    }
}
