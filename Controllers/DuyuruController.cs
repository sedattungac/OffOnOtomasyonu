using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OffOnOtomasyonu.Models.Siniflar;
namespace OffOnOtomasyonu.Controllers
{
    public class DuyuruController : Controller
    {
        // GET: Duyuru
        Context c = new Context();
        public ActionResult Index()
        {
            var veriler = c.mesajlars.Where(x => x.Konu == "Duyuru").OrderByDescending(y => y.Tarih).ToList();
            
            
            return View(veriler);
        }
        [HttpGet]
        public ActionResult DuyuruEkle()
        {
            var mail = (string)Session["KullaniciAd"];
            var GonderilenSayisi = c.mesajlars.Count(x => x.Gonderici == mail).ToString();
            ViewBag.d2 = GonderilenSayisi;
            var GelenSayisi = c.mesajlars.Count(x => x.Alici == mail).ToString();
            ViewBag.d1 = GelenSayisi;

            return View();
        }
      
        [HttpPost]
        public ActionResult DuyuruEkle(mesajlar m)
        {
            var mail = (string)Session["KullaniciAd"];
            m.Tarih = DateTime.Parse(DateTime.Now.ToShortDateString());
            m.Gonderici = mail;
            c.mesajlars.Add(m);
            c.SaveChanges();
            return View();
        }
        public ActionResult DuyuruSil(int id)
        {
            var ktg = c.mesajlars.Find(id);
            c.mesajlars.Remove(ktg);
            c.SaveChanges();
            return RedirectToAction("Index");

        }
    }
}