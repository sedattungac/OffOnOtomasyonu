using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OffOnOtomasyonu.Models.Siniflar;
using OffOnOtomasyonu.Models.Sınıflar;
using PagedList;
using PagedList.Mvc;
namespace OffOnOtomasyonu.Controllers
{
    public class GiderController : Controller
    {
        // GET: Gider
        Context c = new Context();
        public ActionResult Index(int sayfa = 1)
        {

            var degerler = c.Giders.OrderByDescending(x => x.Tarih).ToList().ToPagedList(sayfa, 5);

            return View(degerler);


        }
        [HttpGet]
        public ActionResult GiderEkle()
        {
            return View();
        }
        [HttpPost]
        public ActionResult GiderEkle(Gider k)
        {
            k.Tarih = DateTime.Parse(DateTime.Now.ToShortDateString());
            c.Giders.Add(k);
            c.SaveChanges();

            return RedirectToAction("GiderEkle");


        }
        public ActionResult GiderSil(int id)
        {
            var ktg = c.Giders.Find(id);
            c.Giders.Remove(ktg);
            c.SaveChanges();
            return RedirectToAction("Index");

        }
        public ActionResult GiderGetir(int id)
        {
            var kategori = c.Giders.Find(id);
            return View("GiderGetir", kategori);

        }
        public ActionResult GiderGuncelle(Gider k)
        {
            var ktgr = c.Giders.Find(k.Giderid);
            ktgr.Aciklama = k.Aciklama;
            ktgr.Tutar = k.Tutar;
            ktgr.Tarih = k.Tarih;
            c.SaveChanges();
            return RedirectToAction("Index");

        }
    }
}