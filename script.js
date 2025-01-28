const svg = document.getElementById('wheelSVG');
const NS = "http://www.w3.org/2000/svg";

let centerX, centerY;
let circleRadius, smallRadius;
const numSmallCircles = 11;

const colors = [
    "#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f",
    "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1"
];

const circleTexts = [
    'Recrutamento e Seleção',
    'Gestão de Desempenho',
    'Agro - Data Lake', 'Analytics de Obra',
    'CRM',
    'Gestão de Safras', 'Insights ERP',
    'Analytics ERP',
    'Marketing Intelligence',
    'AI Logistics', 'Plataforma de Fretes'
];

const circleSubtexts = [
    ['Descrição da Vaga - IA Assist', 'Adereência Sugerida'],
    ['Descrição do PDI'],
    ['Extração automática de Dados', 'Visões sobre custos de Produção'],
    ['Insights para a Análise'],
    ['Geração de Mensagens'],
    ['Resultados por Safra/Cultura', 'Saldos de Estoque', 'DRE Gerencial'],
    ['Notificação de Cotações Manuais', 'Alertas'],
    ['Analytics ERP conectado a I.A', 'Análise Preditivas'],
    ['Insights', 'Visualização de Mapa'],
    ['IA Analisando Gráfico', 'Insights'],
    ['Predictive Maintenance', 'Demand forecasting', 'Battery management'],
];

const customTextPositions = [
    { xFactor: 0.010, yFactor: -0.05 },
    { xFactor: 0.02, yFactor: -0.10 },
    { xFactor: 0.02, yFactor: -0.18 },
    { xFactor: 0.05, yFactor: -0.22 },
    { xFactor: 0.08, yFactor: -0.18 },
    { xFactor: 0.08, yFactor: -0.10 },
    { xFactor: -0.06, yFactor: 0.03 },
    { xFactor: 0.17, yFactor: 0.05 },
    { xFactor: 0.08, yFactor: -0.02 },
    { xFactor: -0.05, yFactor: -0.08 },
    { xFactor: 0.02, yFactor: -0.12 }
];

const smallCircles = [];
const allMainTexts = [];
const allSubtexts = [];

function createWheel() {
    svg.innerHTML = '';

    const svgWidth = 1400;
    const svgHeight = 1200;

    centerX = svgWidth / 2;
    centerY = svgHeight / 2;

    circleRadius = svgHeight * 0.3;
    smallRadius = circleRadius * 0.05 * 2.0;

    const linesGroup = document.createElementNS(NS, 'g');
    svg.appendChild(linesGroup);

    const centralRadius = circleRadius * 0.3;
    const centralCircle = document.createElementNS(NS, 'circle');
    centralCircle.setAttribute('cx', centerX);
    centralCircle.setAttribute('cy', centerY);
    centralCircle.setAttribute('r', centralRadius);
    centralCircle.setAttribute('fill', '#808080');
    centralCircle.setAttribute('class', 'central-circle');
    svg.appendChild(centralCircle);

    const centralTextFontSize = centralRadius * 0.3;
    const centralText1 = document.createElementNS(NS, 'text');
    centralText1.setAttribute('x', centerX);
    centralText1.setAttribute('y', centerY - centralRadius * 0.2);
    centralText1.setAttribute('text-anchor', 'middle');
    centralText1.setAttribute('alignment-baseline', 'middle');
    centralText1.setAttribute('fill', '#ffffff');
    centralText1.setAttribute('font-size', centralTextFontSize);
    centralText1.textContent = 'Inteligência';
    svg.appendChild(centralText1);

    const centralText2 = document.createElementNS(NS, 'text');
    centralText2.setAttribute('x', centerX);
    centralText2.setAttribute('y', centerY + centralRadius * 0.2);
    centralText2.setAttribute('text-anchor', 'middle');
    centralText2.setAttribute('alignment-baseline', 'middle');
    centralText2.setAttribute('fill', '#ffffff');
    centralText2.setAttribute('font-size', centralTextFontSize);
    centralText2.textContent = 'Artificial';
    svg.appendChild(centralText2);

    for (let i = 0; i < numSmallCircles; i++) {
        const angle = (2 * Math.PI / numSmallCircles) * i;
        const x = centerX + circleRadius * Math.cos(angle);
        const y = centerY + circleRadius * Math.sin(angle);

        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#000000');
        line.setAttribute('stroke-dasharray', '5,5');
        line.setAttribute('class', 'line');
        line.setAttribute('stroke-width', '1');
        linesGroup.appendChild(line);

        const originalStrokeWidth = 1;

        const fullGroup = document.createElementNS(NS, 'g');
        fullGroup.setAttribute('class', 'full-group interactive-circle');
        fullGroup.setAttribute('data-index', i);
        svg.appendChild(fullGroup);

        const circleGroup = document.createElementNS(NS, 'g');
        circleGroup.setAttribute('class', 'circle-group');
        fullGroup.appendChild(circleGroup);

        circleGroup.lineElement = line;

        const smallCircle = document.createElementNS(NS, 'circle');
        smallCircle.setAttribute('cx', x);
        smallCircle.setAttribute('cy', y);
        smallCircle.setAttribute('r', smallRadius);
        smallCircle.setAttribute('fill', colors[i % colors.length]);
        smallCircle.setAttribute('class', 'small-circle');
        circleGroup.appendChild(smallCircle);

        const iconSize = smallRadius * 1.4;
        const icon = document.createElementNS(NS, 'image');
        icon.setAttribute('href', `https://www.paballand.com/ai-world/images/icon/icon${(i % 25) + 1}.svg`);
        icon.setAttribute('x', x - iconSize / 2);
        icon.setAttribute('y', y - iconSize / 2);
        icon.setAttribute('width', iconSize);
        icon.setAttribute('height', iconSize);
        icon.setAttribute('class', 'circle-icon');
        circleGroup.appendChild(icon);

        const textOffset = 100;
        const textDistance = circleRadius + smallRadius + textOffset;
        const customPos = customTextPositions[i] || { xFactor: 0, yFactor: 0 };
        const adjustedX = customPos.xFactor * circleRadius;
        const adjustedY = customPos.yFactor * circleRadius;

        const textX = centerX + textDistance * Math.cos(angle) + adjustedX;
        const textY = centerY + textDistance * Math.sin(angle) + adjustedY;

        let textAnchor = Math.cos(angle) > 0 ? 'start' : 'end';

        const mainTextFontSize = smallRadius * 0.7;
        const mainText = document.createElementNS(NS, 'text');
        mainText.setAttribute('class', 'main-text');
        mainText.setAttribute('x', textX);
        mainText.setAttribute('y', textY);
        mainText.setAttribute('text-anchor', textAnchor);
        mainText.setAttribute('fill', colors[i % colors.length]);
        mainText.setAttribute('font-size', mainTextFontSize);
        mainText.setAttribute('font-weight', 'bold');
        mainText.textContent = circleTexts[i];
        fullGroup.appendChild(mainText);

        allMainTexts.push(mainText);

        const subtextFontSize = smallRadius * 0.45;
        const subtextGroup = document.createElementNS(NS, 'text');
        subtextGroup.setAttribute('class', 'sub-text');
        subtextGroup.setAttribute('x', textX);
        subtextGroup.setAttribute('y', textY + subtextFontSize * 1.2);
        subtextGroup.setAttribute('text-anchor', textAnchor);
        subtextGroup.setAttribute('fill', '#000000');
        subtextGroup.setAttribute('font-size', subtextFontSize);
        subtextGroup.setAttribute('alignment-baseline', 'hanging');

        circleSubtexts[i].forEach((subtext, idx) => {
            const tspan = document.createElementNS(NS, 'tspan');
            tspan.setAttribute('x', textX);
            tspan.setAttribute('dy', idx === 0 ? '0' : `${subtextFontSize * 1.2}`);
            tspan.textContent = subtext;
            subtextGroup.appendChild(tspan);
        });

        fullGroup.appendChild(subtextGroup);
        allSubtexts.push(subtextGroup);

        circleGroup.mainText = mainText;
        circleGroup.subtextGroup = subtextGroup;

        circleGroup.addEventListener('mouseenter', () => {
            const scaleFactor = 1.4;
            const dx = x - centerX;
            const dy = y - centerY;
            const translateX = -dx * (scaleFactor - 1);
            const translateY = -dy * (scaleFactor - 1);

            fullGroup.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${scaleFactor})`);

            centralCircle.setAttribute('fill', colors[i % colors.length]);

            const hoverStrokeWidth = originalStrokeWidth * 9.5;
            circleGroup.lineElement.setAttribute('stroke-width', hoverStrokeWidth.toString());
            circleGroup.lineElement.setAttribute('stroke', colors[i % colors.length]);
            circleGroup.lineElement.setAttribute('stroke-dasharray', '');

            const linkPreview = document.getElementById('linkPreview');
            linkPreview.textContent = circleLinks[i];
            linkPreview.style.visibility = 'visible';

            allMainTexts.forEach((text) => {
                if (text !== circleGroup.mainText) {
                    text.style.opacity = '0.4';
                }
            });
            allSubtexts.forEach((text) => {
                if (text !== circleGroup.subtextGroup) {
                    text.style.opacity = '0.4';
                }
            });
        });

        circleGroup.addEventListener('mouseleave', () => {
            fullGroup.setAttribute('transform', '');

            centralCircle.setAttribute('fill', '#808080');

            circleGroup.lineElement.setAttribute('stroke-width', originalStrokeWidth.toString());
            circleGroup.lineElement.setAttribute('stroke', '#000000');
            circleGroup.lineElement.setAttribute('stroke-dasharray', '5,5');

            const linkPreview = document.getElementById('linkPreview');
            linkPreview.style.visibility = 'hidden';

            allMainTexts.forEach((text) => {
                text.style.opacity = '1';
            });
            allSubtexts.forEach((text) => {
                text.style.opacity = '1';
            });
        });

        // Evento de clique para o modal genérico
        fullGroup.addEventListener('click', () => {
            openGenericModal(i);
        });
    }
}

// Função genérica para abrir o modal
function openGenericModal(index) {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'genericModal');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '600px';

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = circleTexts[index]; // Título baseado no texto do círculo
    modalContent.appendChild(modalTitle);

    const modalText = document.createElement('p');
    modalText.textContent = `Informações detalhadas sobre o processo relacionado a: ${circleTexts[index]}.`; // Conteúdo personalizado
    modalContent.appendChild(modalText);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#f94144';
    closeButton.style.color = '#fff';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '4px';
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Atualiza a criação da roda em cada redimensionamento da janela
window.addEventListener('resize', createWheel);

createWheel();
