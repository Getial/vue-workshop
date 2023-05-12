const app = Vue.createApp({
  data() {
    return {
      activeJobs: [],
      perks: [],
      loading: true,
      from: 0,
      to: 10
    }
  },
  created() {
    this.getActiveJobs(this.from, this.to);
  },
  mounted() {
    const onScroll = () => {
      if (document.body.scrollHeight - window.innerHeight <= window.scrollY) {
        while(!this.loading) {
          this.from += 10;
          console.log(this.from, this.to)
          this.getActiveJobs(this.from, this.to)
        }
       }
     }
     
     window.addEventListener('scroll', onScroll)
  },
  methods: {
    getActiveJobs(from, to) {
      this.loading = true;
      fetch(`https://api.peaku.co/api-v2/get-active-jobs?start=${from}&step=${to}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        data.map(item => {
          this.activeJobs.push(item)
        })
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  template: `
    <div class="row">

      <div class="col-1" >
        <div id="sidenav" class="d-flex flex-column collapsed" style="height: 90%">
          <v-side_nav />
        </div>
      </div>

      <div class="col pb-5 container-fluid">

        <div class="nav-search-container py-3 d-flex align-items-center">
          <v-nav_search />
        </div>
        <div class="px-2">
          <v-listJobs :jobs="activeJobs" />
          <div v-if="loading" class="position-relative" style="height: 100px">
            <v-loader />
          </div>
        </div>

      </div>
    </div>
  `
})

app.component("v-listJobs", {
  props: ["jobs"],
  template: `
    <div class="jobs-container">
      <div class="card job-card mb-3 border" v-for="job in jobs" :key="job.pk" :id="job.pk" >
        <div class="card-body p-2 p-md-3">
          <div class="row align-items-center">
            <div class="justify-content-center align-items-center col-md-1 col-3">
              <img
                :src="!job.company || !job.company.logo_url ? 'https://peaku.co/img/company.svg' : job.company.logo_url "
                height="70"
                width="70"
                alt="Logo empresa"
                />
            </div>
            <div class="col-md-11 col-9">

              <div class="row align-items-center">
                <h2 class="job-title bold pl-md-2 pr-md-2 mb-0 pb-0 col">{{ job.title }}</h2>
                <section class="pl-md-2 d-inline d-md-inline-flex align-items-center text-truncate col">
                  <div
                    role="button"
                    class="skill-tag text-truncate border border-dark text-dark text-capitalize"
                    style="font-size: 0.8em; margin-bottom: 0px !important;"
                    v-for="main_skill in job.main_skills" :key="main_skill.pk"
                    >
                    {{ main_skill.name }}
                  </div>
                </section>
              </div>

              <div class="row pl-md-2 mt-1 flex-column flex-md-row" style="font-size: 0.9em;">

                <div class="text-truncate text-capitalize col" >
                  <svg
                    viewBox="0 0 16 16"
                    width="1em" height="1em"
                    focusable="false" role="img"
                    aria-label="building"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi-building b-icon bi"
                  >
                    <g><path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"></path><path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path></g>
                  </svg>
                  <span itemprop="name">
                    {{ job.company ? job.company.name : 'Confidential'}}
                  </span>
                </div>

                <div class="text-truncate col">
                  <svg
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    focusable="false"
                    role="img"
                    aria-label="geo alt"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi-geo-alt b-icon bi"
                  >
                    <g><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></g>
                  </svg>

                  <span v-if="job.location_type === null" itemprop="name address">
                    {{ job.city.name }}
                  </span>

                  <span v-else-if="job.location_type.name === 'Remoto - en país'" itemprop="name address">
                    Remoto en {{ job.all_countries.length >= 1 ? job.all_countries[0].name : ''}}
                  </span>
                  <span v-else-if="job.location_type.name === 'Presencial'" itemprop="name address">
                    Presencial ({{ job.all_cities.length > 0 ? job.all_cities[0].name : '' }})
                  </span>
                </div>

                <div class="text-truncate col">
                  <svg
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    focusable="false"
                    role="img"
                    aria-label="cash"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi-cash b-icon bi"
                  >
                    <g data-v-03976c49=""><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"></path></g>
                  </svg>
                  <span>
                    {{ salary_range(job.salary) }}
                  </span>
                </div>

                <div class="d-none d-md-inline-block col">
                  <svg
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    focusable="false"
                    role="img"
                    aria-label="people"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi-people b-icon bi"
                  >
                    <g data-v-03976c49=""><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></g>
                  </svg>
                  {{ job.number_of_offers }} {{ job.number_of_offers > 1 ? 'Vacantes' : 'Vacante' }} 
                </div>

                <div class="text-truncate col">
                  <svg
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    focusable="false"
                    role="img"
                    aria-label="calendar3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi-calendar3 b-icon bi"
                  >
                    <g data-v-03976c49=""><path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"></path><path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></g>
                  </svg>
                  <time :datetime="job.activated_at">
                    9 days ago
                  </time>
                </div>

                <div class="text-truncate col d-flex justify-content-evenly">
                  {{ job.company ? myperks(job.company.my_perks) : '' }}
                  <div class="border rounded p-1" v-for="(perk, indice) in perks" :key="indice">
                    <img class="perk_icon" :src="perk[0]" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    salary_range(salary) {
      let range = '';
      let min = 0;
      let max = 0;
      let price = 0;

      if(salary.confidential) {
        return 'Confidential'
      }

      if(salary.low === salary.high) {
        if (salary.low === 0) {
          range = `$ 0 ${salary.currency.code}`
        } else {
          range = `$ ${salary.currency.code === 'USD' ? salary.low : (salary.low / salary.currency.step)/10} ${salary.currency.code}`
        }
        return range
      }

      if(salary.low === 0) {
        min = 0;
      } else {
        if (salary.currency.code === 'USD') {
          min = salary.low;
        } else {
          min = salary.low / salary.currency.step
        }
      }
      
      max = salary.high / salary.currency.step;
      
      if (salary.currency.code === 'USD') {
        price = `$ ${min/10} - ${max/10} ${salary.currency.code}`
      } else {
        price = `$ ${min/10}M - ${max/10}M ${salary.currency.code}`
      }

      return price
    },
    myperks(per) {
      let total = {
        "Capacitaciones": "./assets/Capacitaciones.png",
        "Certificaciones": "./assets/Certificaciones.png",
        "Fiesta de fin de año": "./assets/Fiesta de fin de año.png",
        "Horario flexible": "./assets/Horario flexible.png",
        "Medicina prepagada": "./assets/Medicina prepagada.png",
        "Seguros": "./assets/Seguros.png",
        "Trabajo remoto": "./assets/Trabajo remoto.png"
      };

      this.perks = per.filter(item => total[item.name])
      this.perks = this.perks.map(item => [
        total[item.name]
      ])
      return 
    }
  }
})

app.component("v-loader", {
  template: `
  <div class="spinner center">
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
  </div>
  `
})

app.component("v-nav_search", {
  template: `
    <div class="container">
      <div class="row w-100 d-flex align-items-center justify-content-between"  >

        <div class="col-md-6 col-12">

          <div class="input-group custom-input-group">
            <div class="bg-light input-group-prepend d-flex align-items-center justify-content-center" style="width: 44px">
              <svg viewBox="0 0 16 16" width="20px" height="20px" focusable="false" role="img" aria-label="search" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-search b-icon bi" data-v-61172ba9=""><g data-v-61172ba9=""><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></g></svg>
            </div>

            <input type="search" placeholder="Buscar por cargo, salario, ubicacion o empresa" class="form-control form-control-md">
          </div>

        </div>
        
        <div class="text-md-right text-white text-truncate mt-2 mt-md-0 col-md-6 col-12 d-flex justify-content-end">
          <button type="button" class="btn btn-outline-light btn-sm rounded-pill mx-1">
            Area
            <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="caret down fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-caret-down-fill b-icon bi"><g data-v-66ca8794="" transform="translate(8 8) scale(0.7 0.7) translate(-8 -8)"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></g></svg>
          </button>
          <button type="button" class="btn btn-outline-light btn-sm rounded-pill mx-1" >
            Cargo
            <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="caret down fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-caret-down-fill b-icon bi"><g data-v-66ca8794="" transform="translate(8 8) scale(0.7 0.7) translate(-8 -8)"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></g></svg>
          </button>
          <button type="button" class="btn btn-outline-light btn-sm rounded-pill mx-1" >
            Salario
            <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="caret down fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-caret-down-fill b-icon bi"><g data-v-66ca8794="" transform="translate(8 8) scale(0.7 0.7) translate(-8 -8)"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></g></svg>
          </button>
          <button type="button" class="btn btn-outline-light btn-sm rounded-pill mx-1" >
            Ubicacion
            <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="caret down fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-caret-down-fill b-icon bi"><g data-v-66ca8794="" transform="translate(8 8) scale(0.7 0.7) translate(-8 -8)"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></g></svg>
          </button>
        </div>

      </div>
    </div>
  `
})
app.component("v-side_nav", {
  template: `
    <ul class="nav mt-2 flex-column" style="margin: 0 auto" >

      <li class="nav-item position-relative">
        <a class="nav-link active">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false"
            role="img"
            aria-label="briefcase"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi-briefcase mx-2 b-icon bi"
            >
              <g><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path></g>
            </svg>
            <span >Empleos</span>
          </a>
      </li>

      <li class="nav-item position-relative">
        <a class="nav-link" target="_self">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false"
            role="img"
            aria-label="file earmark check"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi-file-earmark-check mx-2 b-icon bi"
          >
            <g><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"></path></g>
          </svg>
          <span >Postulaciones</span>
        </a>
      </li>
      
      <li class="nav-item position-relative">
        <a class="nav-link" target="_self">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false"
            role="img"
            aria-label="controller"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi-controller mx-2 b-icon bi"
          >
            <g><path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path><path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"></path></g>
          </svg>
          <span >Cursos y retos</span>
        </a>
      </li>

      <li class="nav-item position-relative">
        <a class="nav-link" target="_self">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false"
            role="img"
            aria-label="chat text"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" class="bi-chat-text mx-2 b-icon bi"
          >
            <g><path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path><path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"></path></g>
          </svg>
          <span >Preguntas</span>
        </a>
      </li>

      <li class="nav-item position-relative">
        <a class="nav-link" target="_self">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false"
            role="img" 
            aria-label="braces"
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor"
            class="bi-braces mx-2 b-icon bi"
          >
            <g><path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"></path></g>
            </svg>
            <span >Bootcamp</span>
        </a>
      </li>

      <li class="nav-item position-relative">
        <a class="nav-link" target="_self">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false"
            role="img"
            aria-label="gem"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi-gem mx-2 b-icon bi"
          >
            <g ><path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"></path></g>
          </svg>
          <span >Premios</span>
        </a>
      </li>

      <li class="nav-item position-relative">
        <a class="nav-link" target="_self">
          <svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            focusable="false" 
            role="img"
            aria-label="file earmark person"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi-file-earmark-person mx-2 b-icon bi"
          >
            <g ><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"></path></g>
          </svg> 
          <span >Tu CV</span>
        </a>
      </li>

      

    </ul>
  `
})

app.mount("#app")