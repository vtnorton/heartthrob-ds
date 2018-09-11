using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/Layout")]
        public IActionResult Layout()
        {
            return View();
        }

        [Route("/Kendo")]
        public IActionResult Kendo()
        {
            return View();
        }

        [Route("/Account")]
        public IActionResult Account()
        {
            return View();
        }

        [Route("/Scripts")]
        public IActionResult Scripts()
        {
            return View();
        }
    }
}
