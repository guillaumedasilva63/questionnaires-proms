'use strict';

/*
  IMPORTANT — VALIDATED WORDING AND LICENSING
  --------------------------------------------
  This technical prototype uses concise paraphrases of questionnaire items.
  Before clinical or research use, replace the item wording and response labels
  with the exact validated French versions for which you have obtained permission.

  Scoring implemented:
  - Oxford Hip/Knee Score: 12 items, 1 to 5 per item, total 12–60 (lower is better).
  - SF-12 v1 norm-based PCS/MCS algorithm (US reference constants).
*/

const sf12Questions = [
  {
    key: 'gh1',
    prompt: 'Évaluation générale de votre santé',
    options: ['Excellente', 'Très bonne', 'Bonne', 'Médiocre', 'Mauvaise']
  },
  {
    key: 'pf02',
    prompt: 'Limitation pour des efforts physiques modérés',
    options: ['Oui, beaucoup', 'Oui, un peu', 'Non, pas du tout']
  },
  {
    key: 'pf04',
    prompt: 'Limitation pour monter plusieurs étages',
    options: ['Oui, beaucoup', 'Oui, un peu', 'Non, pas du tout']
  },
  {
    key: 'rp2',
    prompt: 'Santé physique : avez-vous accompli moins que souhaité ?',
    options: ['Oui', 'Non']
  },
  {
    key: 'rp3',
    prompt: 'Santé physique : avez-vous dû limiter certaines activités ?',
    options: ['Oui', 'Non']
  },
  {
    key: 're2',
    prompt: 'État émotionnel : avez-vous accompli moins que souhaité ?',
    options: ['Oui', 'Non']
  },
  {
    key: 're3',
    prompt: 'État émotionnel : avez-vous réalisé vos activités avec moins de soin ?',
    options: ['Oui', 'Non']
  },
  {
    key: 'bp2',
    prompt: 'Gêne liée à la douleur dans le travail ou les activités habituelles',
    options: ['Pas du tout', 'Un peu', 'Moyennement', 'Beaucoup', 'Énormément']
  },
  {
    key: 'sf2',
    prompt: 'Interférence de la santé physique ou émotionnelle avec la vie sociale',
    options: ['Tout le temps', 'La plupart du temps', 'Une partie du temps', 'Rarement', 'Jamais']
  },
  {
    key: 'mh3',
    prompt: 'Fréquence du sentiment de calme et de détente',
    options: ['Tout le temps', 'Très souvent', 'Souvent', 'Quelquefois', 'Rarement', 'Jamais']
  },
  {
    key: 'vt2',
    prompt: 'Fréquence du sentiment d’énergie',
    options: ['Tout le temps', 'Très souvent', 'Souvent', 'Quelquefois', 'Rarement', 'Jamais']
  },
  {
    key: 'mh4',
    prompt: 'Fréquence du sentiment de tristesse ou d’abattement',
    options: ['Tout le temps', 'Très souvent', 'Souvent', 'Quelquefois', 'Rarement', 'Jamais']
  }
];

const oxfordQuestions = {
  hip: [
    ['Intensité habituelle de la douleur de hanche', ['Aucune', 'Très faible', 'Faible', 'Modérée', 'Sévère']],
    ['Difficulté à vous laver et vous sécher seul(e)', ['Aucune', 'Minime', 'Modérée', 'Majeure', 'Impossible']],
    ['Difficulté pour entrer/sortir d’une voiture ou utiliser les transports', ['Aucune', 'Minime', 'Modérée', 'Majeure', 'Impossible']],
    ['Capacité à mettre seul(e) bas, collants ou chaussettes', ['Facilement', 'Très peu de difficulté', 'Quelques difficultés', 'Beaucoup de difficultés', 'Impossible']],
    ['Capacité à faire seul(e) les courses du domicile', ['Facilement', 'Très peu de difficulté', 'Quelques difficultés', 'Beaucoup de difficultés', 'Impossible']],
    ['Durée de marche avant douleur importante', ['Pas de douleur / plus de 30 min', '16 à 30 min', '5 à 10 min', 'Autour du domicile seulement', 'Marche impossible']],
    ['Capacité à monter au moins un étage', ['Facilement', 'Très peu de difficulté', 'Quelques difficultés', 'Beaucoup de difficultés', 'Impossible']],
    ['Douleur en vous relevant d’une chaise', ['Aucune', 'Légère', 'Modérée', 'Très importante', 'Insupportable']],
    ['Fréquence de la boiterie', ['Jamais ou rarement', 'Parfois / au démarrage', 'Souvent', 'La plupart du temps', 'Tout le temps']],
    ['Fréquence d’une douleur soudaine et intense', ['Jamais', 'Un ou deux jours', 'Quelques jours', 'La plupart des jours', 'Chaque jour']],
    ['Gêne dans le travail ou les activités habituelles', ['Pas du tout', 'Un peu', 'Modérément', 'Fortement', 'Complètement']],
    ['Douleur de hanche au lit la nuit', ['Jamais', 'Une ou deux nuits', 'Quelques nuits', 'La plupart des nuits', 'Toutes les nuits']]
  ],
  knee: [
    ['Intensité habituelle de la douleur du genou', ['Aucune', 'Très faible', 'Faible', 'Modérée', 'Sévère']],
    ['Difficulté à vous laver et vous sécher seul(e)', ['Aucune', 'Minime', 'Modérée', 'Majeure', 'Impossible']],
    ['Difficulté pour entrer/sortir d’une voiture ou utiliser les transports', ['Aucune', 'Minime', 'Modérée', 'Majeure', 'Impossible']],
    ['Durée de marche avant douleur importante', ['Pas de douleur / plus de 30 min', '16 à 30 min', '5 à 15 min', 'Autour du domicile seulement', 'Marche impossible']],
    ['Douleur en vous relevant d’une chaise', ['Aucune', 'Légère', 'Modérée', 'Très importante', 'Insupportable']],
    ['Fréquence de la boiterie', ['Jamais ou rarement', 'Parfois / au démarrage', 'Souvent', 'La plupart du temps', 'Tout le temps']],
    ['Capacité à vous mettre à genoux puis vous relever', ['Facilement', 'Difficulté légère', 'Difficulté modérée', 'Difficulté majeure', 'Impossible']],
    ['Douleur du genou au lit la nuit', ['Jamais', 'Une ou deux nuits', 'Quelques nuits', 'La plupart des nuits', 'Chaque nuit']],
    ['Gêne dans le travail ou les activités habituelles', ['Pas du tout', 'Un peu', 'Modérément', 'Fortement', 'Tout le temps']],
    ['Impression que le genou peut se dérober', ['Jamais ou rarement', 'Parfois / au démarrage', 'Souvent', 'La plupart du temps', 'Tout le temps']],
    ['Capacité à faire seul(e) les courses du domicile', ['Facilement', 'Difficulté légère', 'Difficulté modérée', 'Difficulté majeure', 'Impossible']],
    ['Capacité à monter au moins un étage', ['Facilement', 'Difficulté légère', 'Difficulté modérée', 'Difficulté majeure', 'Impossible']]
  ]
};

// Each lookup entry is [PCS contribution, MCS contribution].
const sf12Weights = {
  gh1: [[0, 0], [-1.31872, -0.06064], [-3.02396, 0.03482], [-5.56461, -0.16891], [-8.37399, -1.71175]],
  pf02: [[-7.23216, 3.93115], [-3.45555, 1.86840], [0, 0]],
  pf04: [[-6.24397, 2.68282], [-2.73557, 1.43103], [0, 0]],
  rp2: [[-4.61617, 1.44060], [0, 0]],
  rp3: [[-5.51747, 1.66968], [0, 0]],
  re2: [[3.04365, -6.82672], [0, 0]],
  re3: [[2.32091, -5.69921], [0, 0]],
  bp2: [[0, 0], [-3.80130, 0.90384], [-6.50522, 1.49384], [-8.38063, 1.76691], [-11.25544, 1.48619]],
  sf2: [[-0.33682, -6.29724], [-0.94342, -8.26066], [-0.18043, -5.63286], [0.11038, -3.13896], [0, 0]],
  mh3: [[0, 0], [0.66514, -1.94949], [1.36689, -4.09842], [2.37241, -6.31121], [2.90426, -7.92717], [3.46638, -10.19085]],
  vt2: [[0, 0], [-0.42251, -0.92057], [-1.14387, -1.65178], [-1.61850, -3.29805], [-2.02168, -4.88962], [-2.44706, -6.02409]],
  mh4: [[4.61446, -16.15395], [3.41593, -10.77911], [2.34247, -8.09914], [1.28044, -4.59055], [0.41188, -1.95934], [0, 0]]
};

const state = {
  patientId: '',
  joint: '',
  result: null
};

const elements = {
  startScreen: document.querySelector('#start-screen'),
  questionnaireScreen: document.querySelector('#questionnaire-screen'),
  resultsScreen: document.querySelector('#results-screen'),
  patientId: document.querySelector('#patient-id'),
  startButton: document.querySelector('#start-button'),
  startError: document.querySelector('#start-error'),
  currentId: document.querySelector('#current-id'),
  progressLabel: document.querySelector('#progress-label'),
  progressBar: document.querySelector('#progress-bar'),
  form: document.querySelector('#questionnaire-form'),
  sf12Container: document.querySelector('#sf12-container'),
  oxfordContainer: document.querySelector('#oxford-container'),
  oxfordTitle: document.querySelector('#oxford-title'),
  submitError: document.querySelector('#submit-error'),
  backButton: document.querySelector('#back-button'),
  resultId: document.querySelector('#result-id'),
  resultJoint: document.querySelector('#result-joint'),
  resultPcs: document.querySelector('#result-pcs'),
  resultMcs: document.querySelector('#result-mcs'),
  resultOxford: document.querySelector('#result-oxford'),
  resultOxfordLabel: document.querySelector('#result-oxford-label'),
  resultTimestamp: document.querySelector('#result-timestamp'),
  copyButton: document.querySelector('#copy-button'),
  csvButton: document.querySelector('#csv-button'),
  printButton: document.querySelector('#print-button'),
  restartButton: document.querySelector('#restart-button'),
  copyStatus: document.querySelector('#copy-status')
};

function showScreen(screen) {
  [elements.startScreen, elements.questionnaireScreen, elements.resultsScreen].forEach((item) => {
    item.hidden = item !== screen;
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function createQuestionBlock({ groupName, index, prompt, options, scoreValues = null }) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'question-block';
  fieldset.dataset.question = groupName;

  const legend = document.createElement('legend');
  legend.innerHTML = `<span class="question-number">${index + 1}.</span> ${escapeHtml(prompt)}`;
  fieldset.appendChild(legend);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options';

  options.forEach((label, optionIndex) => {
    const optionLabel = document.createElement('label');
    optionLabel.className = 'option-label';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = groupName;
    input.value = String(optionIndex + 1);
    input.required = true;
    if (scoreValues) input.dataset.score = String(scoreValues[optionIndex]);

    const text = document.createElement('span');
    text.textContent = label;

    optionLabel.append(input, text);
    optionsContainer.appendChild(optionLabel);
  });

  fieldset.appendChild(optionsContainer);
  return fieldset;
}

function renderQuestionnaires() {
  elements.sf12Container.replaceChildren();
  elements.oxfordContainer.replaceChildren();

  sf12Questions.forEach((question, index) => {
    elements.sf12Container.appendChild(createQuestionBlock({
      groupName: `sf12_${question.key}`,
      index,
      prompt: question.prompt,
      options: question.options
    }));
  });

  const jointQuestions = oxfordQuestions[state.joint];
  jointQuestions.forEach(([prompt, options], index) => {
    elements.oxfordContainer.appendChild(createQuestionBlock({
      groupName: `oxford_${index + 1}`,
      index,
      prompt,
      options,
      scoreValues: [1, 2, 3, 4, 5]
    }));
  });

  elements.oxfordTitle.textContent = state.joint === 'hip' ? 'Oxford Hip Score' : 'Oxford Knee Score';
  elements.currentId.textContent = `ID : ${state.patientId}`;
  updateProgress();
}

function updateProgress() {
  const checked = elements.form.querySelectorAll('input[type="radio"]:checked').length;
  const total = sf12Questions.length + oxfordQuestions[state.joint].length;
  elements.progressLabel.textContent = `${checked} / ${total} réponses`;
  elements.progressBar.style.width = `${Math.round((checked / total) * 100)}%`;
}

function validateStart() {
  const id = elements.patientId.value.trim();
  const jointInput = document.querySelector('input[name="joint"]:checked');
  if (!id || !jointInput) {
    elements.startError.textContent = !id
      ? 'Saisissez un identifiant avant de commencer.'
      : 'Sélectionnez le genou ou la hanche.';
    elements.startError.hidden = false;
    return false;
  }
  elements.startError.hidden = true;
  state.patientId = id;
  state.joint = jointInput.value;
  return true;
}

function collectAnswers() {
  const missing = [];
  const sf12 = {};
  const oxford = [];

  elements.form.querySelectorAll('.question-block').forEach((fieldset) => {
    fieldset.classList.remove('missing');
    const selected = fieldset.querySelector('input:checked');
    if (!selected) {
      fieldset.classList.add('missing');
      missing.push(fieldset);
      return;
    }

    if (selected.name.startsWith('sf12_')) {
      sf12[selected.name.replace('sf12_', '')] = Number(selected.value);
    } else {
      oxford.push(Number(selected.dataset.score));
    }
  });

  return { missing, sf12, oxford };
}

function calculateSF12(answers) {
  let pcs = 56.57706;
  let mcs = 60.75781;

  for (const question of sf12Questions) {
    const responseIndex = answers[question.key] - 1;
    const contribution = sf12Weights[question.key]?.[responseIndex];
    if (!contribution) throw new Error(`Réponse SF-12 invalide pour ${question.key}`);
    pcs += contribution[0];
    mcs += contribution[1];
  }

  return {
    pcs: Number(pcs.toFixed(2)),
    mcs: Number(mcs.toFixed(2))
  };
}

function calculateResults(sf12Answers, oxfordAnswers) {
  if (oxfordAnswers.length !== 12) throw new Error('Le score Oxford nécessite 12 réponses.');
  const sf12 = calculateSF12(sf12Answers);
  return {
    id: state.patientId,
    joint: state.joint,
    pcs: sf12.pcs,
    mcs: sf12.mcs,
    oxford: oxfordAnswers.reduce((sum, value) => sum + value, 0),
    date: new Date()
  };
}

function renderResults() {
  const result = state.result;
  const jointLabel = result.joint === 'hip' ? 'Hanche' : 'Genou';
  const oxfordLabel = result.joint === 'hip' ? 'Oxford Hip Score' : 'Oxford Knee Score';

  elements.resultId.textContent = result.id;
  elements.resultJoint.textContent = jointLabel;
  elements.resultPcs.textContent = result.pcs.toFixed(2);
  elements.resultMcs.textContent = result.mcs.toFixed(2);
  elements.resultOxford.textContent = String(result.oxford);
  elements.resultOxfordLabel.textContent = oxfordLabel;
  elements.resultTimestamp.textContent = result.date.toLocaleString('fr-FR');
  elements.copyStatus.textContent = '';
}

function resultSummary() {
  const result = state.result;
  const jointLabel = result.joint === 'hip' ? 'Hanche' : 'Genou';
  const oxfordLabel = result.joint === 'hip' ? 'Oxford Hip Score' : 'Oxford Knee Score';
  return [
    `ID : ${result.id}`,
    `Articulation : ${jointLabel}`,
    `SF-12 PCS : ${result.pcs.toFixed(2)}`,
    `SF-12 MCS : ${result.mcs.toFixed(2)}`,
    `${oxfordLabel} : ${result.oxford}/60`,
    `Date : ${result.date.toLocaleString('fr-FR')}`
  ].join('\n');
}

function csvEscape(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadCsv() {
  const result = state.result;
  const jointLabel = result.joint === 'hip' ? 'Hanche' : 'Genou';
  const header = ['id', 'articulation', 'sf12_pcs', 'sf12_mcs', 'oxford_score_12_60', 'date_iso'];
  const row = [result.id, jointLabel, result.pcs.toFixed(2), result.mcs.toFixed(2), result.oxford, result.date.toISOString()];
  const csv = `\uFEFF${header.map(csvEscape).join(';')}\n${row.map(csvEscape).join(';')}\n`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `proms_${safeFilename(result.id)}_${result.joint}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function safeFilename(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 60) || 'patient';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function resetApp() {
  state.patientId = '';
  state.joint = '';
  state.result = null;
  elements.form.reset();
  elements.patientId.value = '';
  document.querySelectorAll('input[name="joint"]').forEach((input) => { input.checked = false; });
  elements.startError.hidden = true;
  elements.submitError.hidden = true;
  showScreen(elements.startScreen);
  elements.patientId.focus();
}

elements.startButton.addEventListener('click', () => {
  if (!validateStart()) return;
  elements.form.reset();
  elements.submitError.hidden = true;
  renderQuestionnaires();
  showScreen(elements.questionnaireScreen);
});

elements.patientId.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    elements.startButton.click();
  }
});

elements.form.addEventListener('change', (event) => {
  if (event.target.matches('input[type="radio"]')) {
    event.target.closest('.question-block')?.classList.remove('missing');
    updateProgress();
  }
});

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { missing, sf12, oxford } = collectAnswers();
  if (missing.length) {
    elements.submitError.textContent = `Il manque ${missing.length} réponse${missing.length > 1 ? 's' : ''}. Les questions concernées sont surlignées.`;
    elements.submitError.hidden = false;
    missing[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  try {
    state.result = calculateResults(sf12, oxford);
    elements.submitError.hidden = true;
    renderResults();
    showScreen(elements.resultsScreen);
  } catch (error) {
    elements.submitError.textContent = error instanceof Error ? error.message : 'Erreur de calcul.';
    elements.submitError.hidden = false;
  }
});

elements.backButton.addEventListener('click', () => showScreen(elements.startScreen));
elements.restartButton.addEventListener('click', resetApp);
elements.printButton.addEventListener('click', () => window.print());
elements.csvButton.addEventListener('click', downloadCsv);
elements.copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultSummary());
    elements.copyStatus.textContent = 'Résumé copié.';
  } catch {
    elements.copyStatus.textContent = 'Copie automatique impossible. Utilisez l’impression ou le CSV.';
  }
});
