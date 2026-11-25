export type Lang = 'en' | 'pt' | 'ja';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'pt', 'ja'];

export const translations: Record<Lang, Record<string, string>> = {
	en: {
		'site.title': 'Marcel Akiyama | Product Designer',
		'nav.home': 'Home',
		'nav.cases': 'Case Studies',
		'nav.journal': 'Journal',
		'nav.contact': 'Contact',

		'hero.greeting': "Hi, I'm Marcel 👋",
		'hero.bio':
			'I help teams make better product decisions by connecting evidence, systems thinking, and hands-on design and engineering.',

		'pillars.heading': 'Three lenses behind the work',
		'pillars.eval.title': 'Evaluation Thinking',
		'pillars.eval.tagline': 'Knowing what good looks like.',
		'pillars.eval.desc':
			'A demo can look impressive in a controlled test and still fail in real use. I build evaluation criteria, run structured experiments, and use critical judgment to measure whether an AI feature is actually reliable and useful.',
		'pillars.systems.title': 'Systems Design',
		'pillars.systems.tagline': 'Building infrastructure for intelligence.',
		'pillars.systems.desc':
			'Great products rely on clear structure underneath. I design component libraries, shared knowledge, workflows, and practical guardrails so both people and AI agents can work consistently at scale.',
		'pillars.framing.title': 'Problem Framing',
		'pillars.framing.tagline': 'Knowing what is worth solving.',
		'pillars.framing.desc':
			'Before jumping into solutions, I talk to users, question assumptions, and define what actually matters. Turning an unclear problem into a sharp direction is where the biggest leverage comes from.',
		'pillars.related': 'Related Portfolio Projects',

		'featured.heading': 'FEATURED CASE STUDIES',
		'common.seeAll': 'See All',

		'journal.heading': 'JOURNAL',
		'journal.ai-work-understanding.title': 'AI, Work, and the Problem of Developing Understanding',
		'journal.ai-work-understanding.date': 'SEP 09, 2026',
		'journal.ai-hype-and-reality.title': 'AI Hype and Reality: A Structured, Evidence-Informed Guide',
		'journal.ai-hype-and-reality.date': 'MAR 22, 2026',
		'journal.fluency-and-grounding.title': 'Fluency Is Abundant. Grounding Is the Hard Part',
		'journal.fluency-and-grounding.date': 'JUN 01, 2026',

		'experience.heading': 'EXPERIENCE',
		'experience.item.0.label': 'Experience',
		'experience.item.0.value': '10+ years',
		'experience.item.1.label': 'Alpaca (YC W19)',
		'experience.item.1.value': 'Founding Product Designer',
		'experience.item.2.label': 'Labellio',
		'experience.item.2.value': 'Acquired by Kyocera',
		'experience.item.3.label': 'Domains',
		'experience.item.3.value': 'Fintech · B2B SaaS · Human–AI',

		'cta.heading': "LET'S TALK",
		'cta.text': 'Working on a complex product, AI system, or interaction problem?',
		'cta.button': 'Contact',
		'cta.copy': 'Copy email',
		'cta.copied': 'Copied!',

		'footer.credit': 'Crafted by Marcel Akiyama',

		'cases.heading': 'ALL CASE STUDIES',
		'cases.filter.all': 'All',
		'cases.filter.ai': 'AI & Research',
		'cases.filter.product': 'Product',
		'cases.filter.systems': 'Systems & Brand',

		'case.ai-evals.title': 'AI Evaluation Study Guide',
		'case.ai-evals.subtitle':
			'A 7-module visual course and protocol toolkit for evidence-based AI and Human–AI evaluation',
		'case.ai-evals.tag': 'AI Evaluation · Open Source',
		'case.ai-evals.meta': 'AI Evaluation · Open Source · November 2026',

		'case.epistemia-ux.title': 'Epistemia UX',
		'case.epistemia-ux.subtitle':
			'Seven Human–AI chatbot patterns tested with 12 practitioners to replace fluent guesswork with inspectable judgment',
		'case.epistemia-ux.tag': 'Human–AI UX Research',
		'case.epistemia-ux.meta': 'Human–AI UX Research · November 2026',

		'case.decision-router.title': 'Decision Router',
		'case.decision-router.subtitle':
			'Comparing composed LLM pipelines, typed authority boundaries, and deterministic rules under fault injection',
		'case.decision-router.tag': 'AI Systems · Benchmark',
		'case.decision-router.meta': 'AI Systems · Benchmark · September–November 2026',

		'case.tablox.title': 'Tablox',
		'case.tablox.subtitle':
			'A small experiment in browser clutter, attention, and gentle intervention',
		'case.tablox.tag': 'Browser Experiment',
		'case.tablox.meta': 'Browser Experiment · September 2026',

		'case.easyudi.title': 'EasyUDI',
		'case.easyudi.subtitle':
			'Turning fragmented medical-device data into regulatory-ready records',
		'case.easyudi.tag': 'Product Design · MedTech',
		'case.easyudi.meta': 'Product Design · MedTech · 2025–2026',

		'case.alpaca-ds.title': "Alpaca's Design System",
		'case.alpaca-ds.subtitle':
			'Building a scalable visual language for financial infrastructure',
		'case.alpaca-ds.tag': 'Design System · Fintech',
		'case.alpaca-ds.meta': 'Design System · Fintech · 2022',

		'case.alpaca-logo.title': 'Alpaca Brand Evolution',
		'case.alpaca-logo.subtitle':
			'Turning a playful fintech identity into a global financial infrastructure brand.',
		'case.alpaca-logo.tag': 'Brand Identity · Fintech',
		'case.alpaca-logo.meta': 'Brand Identity · Fintech · 6 weeks',

		'case.fansfirst.title': 'Fans First',
		'case.fansfirst.subtitle':
			'Designing trust into an NHL ticket resale marketplace',
		'case.fansfirst.tag': 'Shipped Product · Marketplace',
		'case.fansfirst.meta': 'Shipped Product · Marketplace · 2022',

		'case.spean.title': 'Spean Luy',
		'case.spean.subtitle':
			'Repairing Critical Friction in a Microfinance Loan Lifecycle',
		'case.spean.tag': 'Shipped Product · Fintech',
		'case.spean.meta': 'Shipped Product · Fintech · 2021',

		'case.labellio.title': 'Labellio',
		'case.labellio.subtitle':
			'Restructuring ML training so domain experts could improve models independently',
		'case.labellio.tag': 'Shipped Product · Acq. by Kyocera',
		'case.labellio.meta': 'Shipped Product · Acq. by Kyocera · 2016 (2 Months from Prototype to MVP)',
	},
	pt: {
		'site.title': 'Marcel Akiyama | Designer de Produto',
		'nav.home': 'Início',
		'nav.cases': 'Estudos de Caso',
		'nav.journal': 'Artigos',
		'nav.contact': 'Contato',

		'hero.greeting': 'Oi, eu sou o Marcel 👋',
		'hero.bio':
			'Ajudo times a tomar melhores decisões de produto conectando evidências, pensamento sistêmico e design e engenharia na prática.',

		'pillars.heading': 'Três lentes por trás do trabalho',
		'pillars.eval.title': 'Pensamento Avaliativo',
		'pillars.eval.tagline': 'Saber o que realmente funciona.',
		'pillars.eval.desc':
			'Uma demo pode parecer impressionante em testes controlados e falhar no uso real. Crio critérios de avaliação, conduzo experimentos estruturados e uso julgamento crítico para medir se um recurso de IA é confiável e útil de verdade.',
		'pillars.systems.title': 'Design de Sistemas',
		'pillars.systems.tagline': 'Construir infraestrutura para inteligência.',
		'pillars.systems.desc':
			'Bons produtos dependem de uma estrutura clara por baixo. Projeto bibliotecas de componentes, conhecimento compartilhado, fluxos e guardrails práticos para que pessoas e agentes de IA criem com consistência em escala.',
		'pillars.framing.title': 'Enquadramento de Problemas',
		'pillars.framing.tagline': 'Saber o que vale a pena resolver.',
		'pillars.framing.desc':
			'Antes de partir para soluções, converso com usuários, questiono premissas e defino o que realmente importa. Transformar um problema confuso em uma direção clara é onde está a maior alavanca.',
		'pillars.related': 'Projetos Relacionados',

		'featured.heading': 'ESTUDOS DE CASO EM DESTAQUE',
		'common.seeAll': 'Ver Todos',

		'journal.heading': 'ARTIGOS',
		'journal.ai-work-understanding.title': 'IA, Trabalho e o Problema de Desenvolver Compreensão',
		'journal.ai-work-understanding.date': '09 SET, 2026',
		'journal.ai-hype-and-reality.title': 'Hype e Realidade da IA: Um Guia Estruturado Baseado em Evidências',
		'journal.ai-hype-and-reality.date': '22 MAR, 2026',
		'journal.fluency-and-grounding.title': 'Fluência é Abundante. Embasamento é a Parte Difícil',
		'journal.fluency-and-grounding.date': '01 JUN, 2026',

		'experience.heading': 'EXPERIÊNCIA',
		'experience.item.0.label': 'Experiência',
		'experience.item.0.value': '10+ anos',
		'experience.item.1.label': 'Alpaca (YC W19)',
		'experience.item.1.value': 'Designer de Produto Fundador',
		'experience.item.2.label': 'Labellio',
		'experience.item.2.value': 'Adquirida pela Kyocera',
		'experience.item.3.label': 'Áreas',
		'experience.item.3.value': 'Fintech · B2B SaaS · Humano–IA',

		'cta.heading': 'VAMOS CONVERSAR',
		'cta.text': 'Trabalhando em um produto complexo, sistema de IA ou problema de interação?',
		'cta.button': 'Contato',
		'cta.copy': 'Copiar e-mail',
		'cta.copied': 'Copiado!',

		'footer.credit': 'Criado por Marcel Akiyama',

		'cases.heading': 'TODOS OS ESTUDOS DE CASO',
		'cases.filter.all': 'Todos',
		'cases.filter.ai': 'IA e Pesquisa',
		'cases.filter.product': 'Produto',
		'cases.filter.systems': 'Sistemas e Marca',

		'case.ai-evals.title': 'Guia de Estudos de Avaliação de IA',
		'case.ai-evals.subtitle':
			'Um curso visual em 7 módulos e kit de protocolos para avaliação de IA e Humano–IA baseada em evidências',
		'case.ai-evals.tag': 'Avaliação de IA · Código Aberto',
		'case.ai-evals.meta': 'Avaliação de IA · Código Aberto · Novembro 2026',

		'case.epistemia-ux.title': 'Epistemia UX',
		'case.epistemia-ux.subtitle':
			'Sete padrões de chatbot Humano–IA testados com 12 profissionais para substituir palpites fluentes por julgamento inspecionável',
		'case.epistemia-ux.tag': 'Pesquisa UX Humano–IA',
		'case.epistemia-ux.meta': 'Pesquisa UX Humano–IA · Novembro 2026',

		'case.decision-router.title': 'Decision Router',
		'case.decision-router.subtitle':
			'Comparando pipelines de LLM, limites tipados de autoridade e regras determinísticas sob injeção de falhas',
		'case.decision-router.tag': 'Sistemas de IA · Benchmark',
		'case.decision-router.meta': 'Sistemas de IA · Benchmark · Setembro–Novembro 2026',

		'case.tablox.title': 'Tablox',
		'case.tablox.subtitle':
			'Um pequeno experimento sobre acúmulo de abas, atenção e intervenção gentil',
		'case.tablox.tag': 'Experimento de Navegador',
		'case.tablox.meta': 'Experimento de Navegador · Setembro 2026',

		'case.easyudi.title': 'EasyUDI',
		'case.easyudi.subtitle':
			'Transformando dados fragmentados de dispositivos médicos em registros prontos para regulação',
		'case.easyudi.tag': 'Design de Produto · MedTech',
		'case.easyudi.meta': 'Design de Produto · MedTech · 2025–2026',

		'case.alpaca-ds.title': 'Design System da Alpaca',
		'case.alpaca-ds.subtitle':
			'Construindo uma linguagem visual escalável para infraestrutura financeira',
		'case.alpaca-ds.tag': 'Design System · Fintech',
		'case.alpaca-ds.meta': 'Design System · Fintech · 2022',

		'case.alpaca-logo.title': 'Evolução da Marca Alpaca',
		'case.alpaca-logo.subtitle':
			'Transformando uma identidade divertida de fintech em uma marca global de infraestrutura financeira.',
		'case.alpaca-logo.tag': 'Identidade Visual · Fintech',
		'case.alpaca-logo.meta': 'Identidade Visual · Fintech · 6 semanas',

		'case.fansfirst.title': 'Fans First',
		'case.fansfirst.subtitle':
			'Projetando confiança em um marketplace de revenda de ingressos da NHL',
		'case.fansfirst.tag': 'Produto Lançado · Marketplace',
		'case.fansfirst.meta': 'Produto Lançado · Marketplace · 2022',

		'case.spean.title': 'Spean Luy',
		'case.spean.subtitle':
			'Reparando atritos críticos no ciclo de vida de empréstimos de microfinanças',
		'case.spean.tag': 'Produto Lançado · Fintech',
		'case.spean.meta': 'Produto Lançado · Fintech · 2021',

		'case.labellio.title': 'Labellio',
		'case.labellio.subtitle':
			'Reestruturando o treino de ML para que especialistas aprimorem modelos de forma independente',
		'case.labellio.tag': 'Produto Lançado · Adq. pela Kyocera',
		'case.labellio.meta': 'Produto Lançado · Adq. pela Kyocera · 2016 (2 meses do protótipo ao MVP)',
	},
	ja: {
		'site.title': 'Marcel Akiyama | プロダクトデザイナー',
		'nav.home': 'ホーム',
		'nav.cases': 'ケーススタディ',
		'nav.journal': 'ジャーナル',
		'nav.contact': 'お問い合わせ',

		'hero.greeting': 'こんにちは、マルセルです 👋',
		'hero.bio':
			'エビデンス、システム思考、そして実践的なデザインとエンジニアリングをつなぎ、チームのより良いプロダクト意思決定を支援します。',

		'pillars.heading': '仕事における3つの視点',
		'pillars.eval.title': '評価思考',
		'pillars.eval.tagline': '「良い」を見極める力。',
		'pillars.eval.desc':
			'テスト環境でうまく見えるデモでも、実際の現場では機能しないことがあります。評価基準の設計や構造化された実験、批判的な判断を通じて、AI機能が本当に信頼でき役に立つかを測定します。',
		'pillars.systems.title': 'システムデザイン',
		'pillars.systems.tagline': '知性のための基盤をつくる。',
		'pillars.systems.desc':
			'優れたプロダクトは明確な構造に支えられています。コンポーネントライブラリ、共有ナレッジ、ワークフロー、実践的なガードレールを設計し、人とAIエージェントが一貫してスケールできる基盤をつくります。',
		'pillars.framing.title': '課題の再定義',
		'pillars.framing.tagline': '解くべき課題を見極める。',
		'pillars.framing.desc':
			'解決策に飛びつく前に、ユーザーと対話し、前提を疑い、本当に重要なことを見極めます。曖昧な課題を明確な方向性へと落とし込むことが、最大のレバレッジを生み出します。',
		'pillars.related': '関連プロジェクト',

		'featured.heading': '注目のケーススタディ',
		'common.seeAll': 'すべて見る',

		'journal.heading': 'ジャーナル',
		'journal.ai-work-understanding.title': 'AI、仕事、そして「理解を育む」という課題',
		'journal.ai-work-understanding.date': '2026年9月9日',
		'journal.ai-hype-and-reality.title': 'AIの過熱と現実：エビデンスに基づく構造化ガイド',
		'journal.ai-hype-and-reality.date': '2026年3月22日',
		'journal.fluency-and-grounding.title': '流暢さは豊かに、根拠づけこそが難しい',
		'journal.fluency-and-grounding.date': '2026年6月1日',

		'experience.heading': '経歴',
		'experience.item.0.label': '経験',
		'experience.item.0.value': '10年以上',
		'experience.item.1.label': 'Alpaca (YC W19)',
		'experience.item.1.value': '創業期プロダクトデザイナー',
		'experience.item.2.label': 'Labellio',
		'experience.item.2.value': '京セラにより買収',
		'experience.item.3.label': '領域',
		'experience.item.3.value': 'Fintech · B2B SaaS · Human–AI',

		'cta.heading': 'お問い合わせ',
		'cta.text': '複雑なプロダクト、AIシステム、インタラクションの課題に取り組んでいますか？',
		'cta.button': '連絡する',
		'cta.copy': 'メールをコピー',
		'cta.copied': 'コピーしました！',

		'footer.credit': '制作：Marcel Akiyama',

		'cases.heading': 'すべてのケーススタディ',
		'cases.filter.all': 'すべて',
		'cases.filter.ai': 'AI・リサーチ',
		'cases.filter.product': 'プロダクト',
		'cases.filter.systems': 'システム・ブランド',

		'case.ai-evals.title': 'AI評価スタディガイド',
		'case.ai-evals.subtitle':
			'エビデンスに基づくAIおよびHuman–AI評価のための7モジュール視覚コースとプロトコルツールキット',
		'case.ai-evals.tag': 'AI評価 · オープンソース',
		'case.ai-evals.meta': 'AI評価 · オープンソース · 2026年11月',

		'case.epistemia-ux.title': 'Epistemia UX',
		'case.epistemia-ux.subtitle':
			'12名の実務者と検証した、流暢な推測を検証可能な判断へ置き換える7つのHuman–AIチャットボットパターン',
		'case.epistemia-ux.tag': 'Human–AI UXリサーチ',
		'case.epistemia-ux.meta': 'Human–AI UXリサーチ · 2026年11月',

		'case.decision-router.title': 'Decision Router',
		'case.decision-router.subtitle':
			'障害注入下におけるLLMパイプライン、型付き権限境界、決定論的ルールの比較評価',
		'case.decision-router.tag': 'AIシステム · ベンチマーク',
		'case.decision-router.meta': 'AIシステム · ベンチマーク · 2026年9月–11月',

		'case.tablox.title': 'Tablox',
		'case.tablox.subtitle':
			'ブラウザの散らかり、注意力、穏やかな介入をめぐる小さな実験',
		'case.tablox.tag': 'ブラウザ実験',
		'case.tablox.meta': 'ブラウザ実験 · 2026年9月',

		'case.easyudi.title': 'EasyUDI',
		'case.easyudi.subtitle':
			'断片化した医療機器データを規制対応可能なレコードへと変換',
		'case.easyudi.tag': 'プロダクトデザイン · MedTech',
		'case.easyudi.meta': 'プロダクトデザイン · MedTech · 2025–2026年',

		'case.alpaca-ds.title': 'Alpaca デザインシステム',
		'case.alpaca-ds.subtitle':
			'金融インフラのためのスケーラブルなビジュアル言語の構築',
		'case.alpaca-ds.tag': 'デザインシステム · Fintech',
		'case.alpaca-ds.meta': 'デザインシステム · Fintech · 2022年',

		'case.alpaca-logo.title': 'Alpaca ブランド刷新',
		'case.alpaca-logo.subtitle':
			'遊び心あるFintechアイデンティティをグローバルな金融インフラブランドへ進化',
		'case.alpaca-logo.tag': 'ブランドアイデンティティ · Fintech',
		'case.alpaca-logo.meta': 'ブランドアイデンティティ · Fintech · 6週間',

		'case.fansfirst.title': 'Fans First',
		'case.fansfirst.subtitle':
			'NHLチケット二次流通マーケットプレイスにおける信頼の設計',
		'case.fansfirst.tag': 'ローンチ製品 · マーケットプレイス',
		'case.fansfirst.meta': 'ローンチ製品 · マーケットプレイス · 2022年',

		'case.spean.title': 'Spean Luy',
		'case.spean.subtitle':
			'マイクロファイナンス融資ライフサイクルにおける重大な摩擦の解消',
		'case.spean.tag': 'ローンチ製品 · Fintech',
		'case.spean.meta': 'ローンチ製品 · Fintech · 2021年',

		'case.labellio.title': 'Labellio',
		'case.labellio.subtitle':
			'ドメイン専門家が自律的にモデルを改善できるようML学習を再構築',
		'case.labellio.tag': 'ローンチ製品 · 京セラが買収',
		'case.labellio.meta': 'ローンチ製品 · 京セラが買収 · 2016年（プロトタイプからMVPまで2ヶ月）',
	},
};
