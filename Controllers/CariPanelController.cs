using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using OffOnOtomasyonu.Models.Siniflar;

namespace OffOnOtomasyonu.Controllers
{
  
    public class CariPanelController : Controller
    {

        // GET: CariPanel
        Context c = new Context();

        public ActionResult Index()
        {
            var mail = (string)Session["CariMail"];
            var degerler = c.mesajlars.Where(x => x.Alici == mail).ToList();
            ViewBag.m = mail;
            var mailid = c.Carilers.Where(x => x.CariMail == mail).Select(y => y.Cariid).FirstOrDefault();
            ViewBag.mid = mailid;
            var adres = c.Carilers.Where(x => x.CariMail == mail).Select(y => y.CariAdres + " " + y.CariSehir).FirstOrDefault();
            ViewBag.adres = adres;
            var telefon = c.Carilers.Where(x => x.CariMail == mail).Select(y => y.CariTel).FirstOrDefault();
            ViewBag.telefon = telefon;
            var carimail = c.Carilers.Where(x => x.CariMail == mail).Select(y => y.CariMail).FirstOrDefault();
            ViewBag.carimail = carimail;
            var adsoyad = c.Carilers.Where(x => x.CariMail == mail).Select(y => y.CariAd + " " + y.CariSoyad).FirstOrDefault();
            ViewBag.adsoyad = adsoyad;
            var toplamSatis = c.SatisHarekets.Where(x => x.Cariid == mailid).Count();

            ViewBag.toplamsatis = toplamSatis;



            if (toplamSatis != 0)

            {

                var toplamOdeme = c.SatisHarekets.Where(x => x.Cariid == mailid).Select(y => y.ToplamTutar).Sum();

                ViewBag.toplamtutar = toplamOdeme;



                var toplamUrun = c.SatisHarekets.Where(x => x.Cariid == mailid).Select(y => y.Adet).Sum();

                ViewBag.toplamurunsayisi = toplamUrun;

            }

            else

            {

                ViewBag.tTutar = 0;

                ViewBag.tUrun = 0;

            }
            return View(degerler);
        }

        public ActionResult Siparislerim()
        {
            var mail = (string)Session["CariMail"];
            var id = c.Carilers.Where(x => x.CariMail == mail.ToString()).Select(y => y.Cariid).FirstOrDefault();
            var degerler = c.SatisHarekets.Where(x => x.Cariid == id).ToList();

            return View(degerler);

        }
     

        public ActionResult GelenMesajlar()
        {
            var mail = (string)Session["CariMail"];
            var mesajlar = c.mesajlars.Where(x => x.Alici == mail).OrderByDescending(x => x.MesajID).ToList();
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;
            return View(mesajlar);
        }

        public ActionResult GidenMesajlar()
        {
            var mail = (string)Session["CariMail"];
            var mesajlar = c.mesajlars.Where(x => x.Gonderici == mail).OrderByDescending(z => z.MesajID).ToList();
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            return View(mesajlar);
        }

        public ActionResult MesajDetay(int id)
        {

            var degerler = c.mesajlars.Where(x => x.MesajID == id).ToList();

            var mail = (string)Session["CariMail"];
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;
            return View(degerler);
        }

        [HttpGet]
        public ActionResult YeniMesaj()
        {
            var mail = (string)Session["CariMail"];
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;

            return View();
        }

        [HttpPost]
        public ActionResult YeniMesaj(mesajlar m)
        {
            var mail = (string)Session["CariMail"];
            m.Tarih = DateTime.Parse(DateTime.Now.ToShortDateString());
            m.Gonderici = mail;
            c.mesajlars.Add(m);
            c.SaveChanges();
            return View();
        }

        public ActionResult KargoTakip(string p)
        {
            var kargo = from x in c.KargoDetays select x;


            kargo = kargo.Where(y => y.TakipKodu.Contains(p));

            return View(kargo.ToList());

        }
        public ActionResult CariKargoTakip(string id)
        {

            var degerler = c.KargoTakips.Where(x => x.TakipKodu == id).ToList();

            return View(degerler);
        }
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Login");
        }
        public PartialViewResult Partial1()
        {

            var mail = (string)Session["CariMail"];
            var id = c.Carilers.Where(x => x.CariMail == mail).Select(y => y.Cariid).FirstOrDefault();
            var caribul = c.Carilers.Find(id);
            return PartialView("Partial1", caribul);

        }
        public PartialViewResult Partial2()
        {
            var veriler = c.mesajlars.Where(x => x.Gonderici == "admin").OrderByDescending(y => y.Tarih).ToList();
            //var veriler = c.mesajlars.Where(x => x.Gonderici == "admin").ToList();
            return PartialView(veriler);
        }

        public ActionResult CariBilgiGuncelle(Cariler cr)
        {
            var cari = c.Carilers.Find(cr.Cariid);
            cari.CariAd = cr.CariAd;
            cari.CariSoyad = cr.CariSoyad;
            cari.CariAdres = cr.CariAdres;
            cari.CariSehir = cr.CariSehir;
            cari.CariMail = cr.CariMail;
            cari.CariTel = cr.CariTel;
            cari.CariSifre = cr.CariSifre;
            c.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult CariGaleri()
        {

            var degerler = c.Uruns.Where(x => x.Durum == true).ToList();

            return View(degerler);

        }

        public ActionResult CariPersonelBilgi()
        {

            var sorgu = c.Personels.ToList();


            return View(sorgu);

        }

        public ActionResult Haritalar()
        {
            return View();
        }
    }
}