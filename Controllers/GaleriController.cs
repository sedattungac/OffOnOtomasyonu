using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OffOnOtomasyonu.Models.Siniflar;
using OffOnOtomasyonu.Models.Sınıflar;
namespace OffOnOtomasyonu.Controllers
{
    public class GaleriController : Controller
    {
        // GET: Galeri

        Context c = new Context();
        public ActionResult Index()
        {

            var degerler = c.Uruns.Where(x => x.Durum == true).ToList();

            return View(degerler);


        }

        public ActionResult Guncel()
        {


            var degerler = c.Uruns.ToList();



            return View(degerler);
        }
        public ActionResult GuncelOlmayan()
        {

            var degerler = c.Uruns.Where(x => x.Durum == false).ToList();



            return View(degerler);
        }
    }
}