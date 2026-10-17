import type { Testimonial } from "@/lib/content/types";

// Real patient reviews from his Facebook page (100% recommend, 34 reviews), copied
// word for word; long ones shortened with "…" and emojis removed.
// Picked for variety: infertility, ICSI, delivery, C-section, hysterectomy, follow-up.
// Reviews that mention the Suez clinic are left out while it is hidden.
// No names on purpose: these are pregnancy and fertility stories (sensitive health data).
// English: our translation (like Facebook's "See translation"), marked as translated on the page.
export const testimonials: Testimonial[] = [
  {
    quote: {
      ar: "كان عندى تاخير فى الحمل اكتر من خمس سنين والحمد لله ربنا كرمنى ربنا يكرمك دكتور",
      en: "I had delayed pregnancy for more than five years, and thank God, He blessed me. God bless you, doctor.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "كنت متابعه معاه فحملي اللي فات وجالي وجع ولاده وعلي الرغم انه كان مسافر بره القاهره رجعلي من السفر مخصوص وولدني طبيعي وجبت بنوته زي القمر الحمد لله",
      en: "He followed me through my last pregnancy. When labor started, even though he was traveling outside Cairo, he came back especially for me and delivered me naturally, and I had a beautiful baby girl. Thank God.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "دكتور ممتاز ولديه اعلي نسب نجاح لحالات تأخر الإنجاب والحقن المجهري",
      en: "An excellent doctor with the highest success rates for delayed pregnancy and ICSI cases.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "عمل لوالدتي استئصال رحم بعد ما عانت كتير من الالم والحمد لله الالم راح بعد العمليه. شكرا د.رامي",
      en: "He performed a hysterectomy for my mother after she had suffered a lot of pain, and thank God the pain went away after the operation. Thank you, Dr. Ramy.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "دكتور رامي كنت حبه اشكر حضرتك علي الي عملتة معانا و انك استحملتني التسع شهور … تجربتي مع القيصريه بدون الم كانت تجربه حلوة جدا و مافيش فعلا اي الم خالص",
      en: "Dr. Ramy, I wanted to thank you for everything you did for us and for putting up with me for nine months … My C-section experience without pain was a really good one, and there truly was no pain at all.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "دكتور رامي حقيقي حضرتك دكتور ممتاز ومحترم جدا في شغلك وبتهتم بينا من اول الحمل وحتي بعد الولادة وبتجاوب ع كل الاسئلة حتي لو سؤال صغير",
      en: "Dr. Ramy, you are truly an excellent and very respectful doctor. You care for us from the start of pregnancy until after delivery, and you answer every question, even a small one.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "بجد يا دكتور مهما اشكرك طول حياتي مش هعرف اوفيك حاجه عندك ضمير وبتهتم بالمتابعه … خليت اكتر يوم كان خوف ورعب ليا لاجمل يوم",
      en: "Honestly, doctor, however much I thank you my whole life, I could never repay you. You are conscientious and you care about follow-up … You turned what was the most frightening day for me into the most beautiful one.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "هو من أفضل دكاترة النساء والتوليد ولا نزكيه علي الله فهو يتمتع بحسن الخلق واللين في التعامل واتقاء الله في التعامل مع مرضاه",
      en: "He is one of the best obstetricians and gynecologists, and we hold no one above God. He has good manners, is gentle in how he treats people, and fears God in caring for his patients.",
    },
    source: "facebook",
  },
  {
    quote: {
      ar: "دكتور شاطر جدا بنصح اي ست تتابع معاه",
      en: "A very skilled doctor. I recommend him to every woman to follow up with.",
    },
    source: "facebook",
  },
];
