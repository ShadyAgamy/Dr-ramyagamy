import type { Service } from "@/lib/content/types";

// Titles from the doctor's profile document and the developer's list (2026-10-17).
// Summaries (cards and meta descriptions) and the long pages in
// content/services/<slug>/ar.mdx and en.mdx are general medical information we
// wrote from international guidelines (ESHRE, ASRM, ACOG, NICE, WHO), not copied
// from other sites and with no claims about results. English is our translation.
// To review with the doctor before launch (2026-10-24).
export const services: Service[] = [
  {
    slug: "icsi-ivf",
    icon: "microscope",
    title: { ar: "الحقن المجهري وأطفال الأنابيب", en: "ICSI and IVF" },
    summary: {
      ar: "تخصيب البويضات في المعمل ثم نقل أفضل الأجنة إلى الرحم. في الحقن المجهري يُحقن حيوان منوي واحد مختار داخل كل بويضة ناضجة، وهو الحل الأنسب لضعف الحيوانات المنوية الشديد وفشل الإخصاب السابق.",
      en: "Eggs are fertilized in the lab and the best embryos are transferred to the uterus. In ICSI, a single selected sperm is injected into each mature egg: the method of choice for severe male factor and previous fertilization failure.",
    },
    order: 1,
  },
  {
    slug: "infertility-treatment",
    icon: "heart",
    title: { ar: "علاج تأخر الإنجاب والعقم", en: "Infertility Treatment" },
    summary: {
      ar: "تقييم شامل للزوجين معًا لمعرفة سبب تأخر الحمل، في التبويض أو الأنابيب أو الرحم أو الحيوانات المنوية، ثم خطة علاج تبدأ بالأبسط وتتدرج حسب السبب والسن.",
      en: "A full assessment of both partners to find the cause of delayed pregnancy, whether ovulation, the tubes, the uterus or the sperm, then a treatment plan that starts simple and steps up according to the cause and age.",
    },
    order: 2,
  },
  {
    slug: "ovulation-induction",
    icon: "egg",
    title: { ar: "تنشيط التبويض", en: "Ovulation Induction" },
    summary: {
      ar: "علاج اضطرابات التبويض، وأشهرها تكيس المبايض، بالليتروزول أو حقن الهرمونات، مع متابعة البويضات بالسونار لضبط الجرعة وتوقيت التبويض وتقليل خطر الحمل المتعدد.",
      en: "Treating ovulation disorders, most often PCOS, with letrozole or hormone injections, while tracking the follicles by ultrasound to adjust the dose, time ovulation and lower the risk of multiple pregnancy.",
    },
    order: 3,
  },
  {
    slug: "assisted-reproduction",
    icon: "flask",
    title: { ar: "الإخصاب المساعد بأحدث التقنيات", en: "Assisted Reproduction" },
    summary: {
      ar: "تقنيات تُختار حسب سبب تأخر الحمل: من التلقيح الصناعي داخل الرحم إلى الحقن المجهري واستخراج الحيوانات المنوية جراحيًا، مع زراعة الأجنة حتى اليوم الخامس وتجميدها بالتجميد السريع.",
      en: "Techniques chosen by the cause of infertility: from intrauterine insemination to ICSI and surgical sperm retrieval, with blastocyst culture and vitrification of embryos.",
    },
    order: 4,
  },
  {
    slug: "embryo-genetic-testing",
    icon: "dna",
    title: { ar: "الفحص الوراثي للأجنة", en: "Embryo Genetic Testing (PGT)" },
    summary: {
      ar: "فحص عينة صغيرة من خلايا الجنين في اليوم الخامس قبل نقله، لاكتشاف الأمراض الوراثية أو اختلال عدد الكروموسومات واختيار الجنين الأنسب للنقل.",
      en: "Testing a few cells from the embryo on day 5, before transfer, to detect genetic diseases or an abnormal number of chromosomes and choose the most suitable embryo.",
    },
    order: 5,
  },
  {
    slug: "sex-selection",
    icon: "baby",
    title: { ar: "تحديد نوع الجنين", en: "Sex Selection" },
    summary: {
      ar: "الطريقة العلمية الموثوقة لتحديد نوع الجنين: حقن مجهري مع فحص وراثي للأجنة يحدد نوع كل جنين من كروموسوماته قبل نقله إلى الرحم.",
      en: "The reliable scientific way to choose the baby's sex: ICSI with genetic testing that reads each embryo's sex from its chromosomes before transfer.",
    },
    order: 6,
  },
  {
    slug: "egg-freezing",
    icon: "snowflake",
    title: { ar: "تجميد البويضات", en: "Egg Freezing" },
    summary: {
      ar: "سحب البويضات الناضجة بعد تنشيط المبيض وتجميدها بالتجميد السريع (Vitrification)، للحفاظ على فرصة الإنجاب لأسباب طبية أو عند تأجيل الحمل.",
      en: "Retrieving mature eggs after ovarian stimulation and freezing them by vitrification, to preserve fertility for medical reasons or when delaying pregnancy.",
    },
    order: 7,
  },
  {
    slug: "endoscopic-surgery",
    icon: "scope",
    title: { ar: "جراحات المناظير الدقيقة", en: "Precision Endoscopic Surgery" },
    summary: {
      ar: "تشخيص وعلاج مشاكل الرحم والمبايض والأنابيب بمنظار البطن أو منظار الرحم، بفتحات صغيرة أو بدون جرح، مع ألم أقل وتعافٍ أسرع من الجراحة المفتوحة.",
      en: "Diagnosing and treating problems of the uterus, ovaries and tubes by laparoscopy or hysteroscopy, through small incisions or none, with less pain and faster recovery than open surgery.",
    },
    order: 8,
  },
  {
    slug: "endometriosis-treatment",
    icon: "pulse",
    title: { ar: "علاج بطانة الرحم المهاجرة", en: "Endometriosis Treatment" },
    summary: {
      ar: "حالة مزمنة تسبب ألمًا شديدًا وقد تؤخر الحمل. يعتمد التشخيص الحديث على الفحص والسونار المتخصص، والعلاج بالهرمونات أو بالمنظار حسب الأعراض والرغبة في الإنجاب.",
      en: "A chronic condition that causes severe pain and can delay pregnancy. Modern diagnosis relies on examination and specialized ultrasound, and treatment uses hormones or laparoscopy depending on symptoms and fertility plans.",
    },
    order: 9,
  },
  {
    slug: "laparoscopic-hysterectomy",
    icon: "stethoscope",
    title: { ar: "استئصال الرحم بالمنظار", en: "Laparoscopic Hysterectomy" },
    summary: {
      ar: "استئصال الرحم من خلال فتحات صغيرة بمنظار عالي الدقة، لحالات مثل الأورام الليفية والنزيف المزمن، مع ألم أقل وعودة أسرع للحياة الطبيعية مقارنة بالجراحة المفتوحة.",
      en: "Removing the uterus through small incisions with a high-definition laparoscope, for conditions such as fibroids and chronic bleeding, with less pain and a faster return to normal life than open surgery.",
    },
    order: 10,
  },
  {
    slug: "obstetric-gynecologic-surgery",
    icon: "hospital",
    title: { ar: "جراحات النساء والتوليد", en: "Obstetric and Gynecologic Surgery" },
    summary: {
      ar: "عمليات أمراض النساء مثل استئصال الأورام الليفية وأكياس المبايض وإصلاح سقوط الرحم، والولادة القيصرية عند وجود سبب طبي، مع الحفاظ على الخصوبة كلما أمكن.",
      en: "Gynecologic operations such as fibroid and ovarian cyst removal and prolapse repair, and cesarean delivery when there is a medical reason, preserving fertility whenever possible.",
    },
    order: 11,
  },
  {
    slug: "pregnancy-and-childbirth",
    icon: "calendar",
    title: { ar: "متابعة الحمل والولادة", en: "Pregnancy and Childbirth Care" },
    summary: {
      ar: "متابعة الأم والجنين من قبل الحمل حتى ما بعد الولادة: سونار في مواعيده، وتحاليل الفحص المبكر، ومتابعة الضغط والسكر، والاستعداد للولادة الطبيعية أو القيصرية.",
      en: "Care for mother and baby from before pregnancy until after delivery: scans on schedule, early screening tests, blood pressure and sugar checks, and preparation for natural or cesarean delivery.",
    },
    order: 12,
  },
];
