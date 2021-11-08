using OffOnOtomasyonu.Models.Siniflar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OffOnOtomasyonu.Controllers
{
    public class MesajController : Controller
    {
        Context c = new Context();
        // GET: Mesaj
        
        public ActionResult GelenMesajlar()
        {
            var mail = (string)Session["KullaniciAd"];
            var mesajlar = c.mesajlars.Where(x => x.Alici == mail).OrderByDescending(x => x.MesajID).ToList();
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;
            return View(mesajlar);
        }
    
        public ActionResult GidenMesajlar()
        {
            var mail = (string)Session["KullaniciAd"];
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

            var mail = (string)Session["KullaniciAd"];
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;
            return View(degerler);
        }
       
        [HttpGet]
        public ActionResult YeniMesaj()
        {
            var mail = (string)Session["KullaniciAd"];
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;

            return View();
        }
        
        [HttpPost]
        public ActionResult YeniMesaj(mesajlar m)
        {
            var mail = (string)Session["KullaniciAd"];
            m.Tarih = DateTime.Parse(DateTime.Now.ToShortDateString());
            m.Gonderici = mail;
            c.mesajlars.Add(m);
            c.SaveChanges();
            return View();
        }


    }
}