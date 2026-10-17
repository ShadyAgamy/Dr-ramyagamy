import type { Service } from "@/lib/content/types";

// Titles from the doctor's profile document and the developer's list (2026-10-17).
// Summaries are short general definitions written by us (taken from his reel
// scripts where possible), not copied from other sites. English is our translation.
// Long descriptions go in content/services/<slug>/ar.mdx (and en.mdx).
export const services: Service[] = [
  {
    slug: "icsi-ivf",
    icon: "microscope",
    title: { ar: "الحقن المجهري وأطفال الأنابيب", en: "ICSI and IVF" },
    summary: {
      ar: "تخصيب البويضات خارج الجسم ثم ترجيع أفضل الأجنة إلى الرحم. في الحقن المجهري نختار الحيوان المنوي ونحقنه داخل البويضة تحت الميكروسكوب.",
      en: "Eggs are fertilized outside the body and the best embryos are transferred to the uterus. In ICSI, a selected sperm is injected into the egg under the microscope.",
    },
    order: 1,
  },
  {
    slug: "infertility-treatment",
    icon: "heart",
    title: { ar: "علاج تأخر الإنجاب والعقم", en: "Infertility Treatment" },
    summary: {
      ar: "تقييم أسباب تأخر الحمل عند الزوجين بالتحاليل والسونار، ووضع خطة العلاج المناسبة لكل حالة.",
      en: "Assessing the causes of delayed pregnancy in both partners with tests and ultrasound, and planning the right treatment for each case.",
    },
    order: 2,
  },
  {
    slug: "ovulation-induction",
    icon: "egg",
    title: { ar: "تنشيط التبويض", en: "Ovulation Induction" },
    summary: {
      ar: "علاج ضعف التبويض بأدوية أو حقن منشطة، مع متابعة نمو البويضات بالسونار.",
      en: "Treating weak ovulation with medication or stimulation injections, while following the eggs' growth with ultrasound.",
    },
    order: 3,
  },
  {
    slug: "assisted-reproduction",
    icon: "flask",
    title: { ar: "الإخصاب المساعد بأحدث التقنيات", en: "Assisted Reproduction" },
    summary: {
      ar: "التلقيح الصناعي والحقن المجهري وغيرها من تقنيات المساعدة على الإنجاب، حسب سبب تأخر الحمل.",
      en: "IUI, ICSI and other assisted reproduction techniques, chosen according to the cause of delayed pregnancy.",
    },
    order: 4,
  },
  {
    slug: "embryo-genetic-testing",
    icon: "dna",
    title: { ar: "الفحص الوراثي للأجنة", en: "Embryo Genetic Testing (PGT)" },
    summary: {
      ar: "فحص الأجنة الناتجة عن الحقن المجهري قبل ترجيعها، لاختيار الأجنة السليمة كروموسوميًا.",
      en: "Testing embryos created through ICSI before transfer, to choose chromosomally healthy embryos.",
    },
    order: 5,
  },
  {
    slug: "sex-selection",
    icon: "baby",
    title: { ar: "تحديد نوع الجنين", en: "Sex Selection" },
    summary: {
      ar: "تحديد نوع الجنين من خلال الحقن المجهري والفحص الوراثي للأجنة قبل ترجيعها إلى الرحم.",
      en: "Choosing the baby's sex through ICSI and genetic testing of the embryos before transfer to the uterus.",
    },
    order: 6,
  },
  {
    slug: "egg-freezing",
    icon: "snowflake",
    title: { ar: "تجميد البويضات", en: "Egg Freezing" },
    summary: {
      ar: "سحب البويضات بعد تنشيط المبيض وتجميدها، للحفاظ على فرص الحمل في المستقبل.",
      en: "Retrieving eggs after ovarian stimulation and freezing them, to preserve the chances of pregnancy in the future.",
    },
    order: 7,
  },
  {
    slug: "endoscopic-surgery",
    icon: "scope",
    title: { ar: "جراحات المناظير الدقيقة", en: "Precision Endoscopic Surgery" },
    summary: {
      ar: "تشخيص وعلاج مشاكل الرحم والمبايض والأنابيب بمنظار البطن ومنظار الرحم، من خلال فتحات صغيرة.",
      en: "Diagnosing and treating problems of the uterus, ovaries and tubes with laparoscopy and hysteroscopy, through small incisions.",
    },
    order: 8,
  },
  {
    slug: "endometriosis-treatment",
    icon: "pulse",
    title: { ar: "علاج بطانة الرحم المهاجرة", en: "Endometriosis Treatment" },
    summary: {
      ar: "تشخيص وعلاج بطانة الرحم المهاجرة، وهي نمو أنسجة شبيهة ببطانة الرحم خارجه، بالأدوية أو بالمنظار حسب الحالة.",
      en: "Diagnosing and treating endometriosis, where tissue similar to the uterine lining grows outside the uterus, with medication or laparoscopy depending on the case.",
    },
    order: 9,
  },
  {
    slug: "laparoscopic-hysterectomy",
    icon: "stethoscope",
    title: { ar: "استئصال الرحم بالمنظار", en: "Laparoscopic Hysterectomy" },
    summary: {
      ar: "استئصال الرحم بالمنظار من خلال فتحات صغيرة في البطن بدلًا من الجراحة المفتوحة.",
      en: "Removing the uterus laparoscopically through small incisions in the abdomen instead of open surgery.",
    },
    order: 10,
  },
  {
    slug: "obstetric-gynecologic-surgery",
    icon: "hospital",
    title: { ar: "جراحات النساء والتوليد", en: "Obstetric and Gynecologic Surgery" },
    summary: {
      ar: "العمليات الجراحية لأمراض النساء، والولادة القيصرية عند الحاجة.",
      en: "Surgery for gynecological conditions, and cesarean delivery when needed.",
    },
    order: 11,
  },
  {
    slug: "pregnancy-and-childbirth",
    icon: "calendar",
    title: { ar: "متابعة الحمل والولادة", en: "Pregnancy and Childbirth Care" },
    summary: {
      ar: "متابعة الحمل بالسونار والتحاليل من أول أسابيعه حتى الولادة، طبيعية أو قيصرية حسب الحالة.",
      en: "Following the pregnancy with ultrasound and tests from the first weeks until delivery, natural or cesarean depending on the case.",
    },
    order: 12,
  },
];
