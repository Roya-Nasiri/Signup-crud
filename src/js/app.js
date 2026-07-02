      const inp = document.querySelectorAll('.box>input');
      const newInp = document.querySelectorAll('.pop>input');
      const pop = document.querySelector('.pop');
      const regbtn = document.querySelector('.reg');
      const outbox = document.querySelector('.logout');
      const outbtn = document.querySelector('.logout>button');
      const log = document.querySelector('.log');
      const box = document.querySelector('.box');
      const toptext = document.querySelector('.box>h3');
      const exist = document.querySelector('.box>h2');
      const _h = document.querySelector('.logout>h3');
      const boxrem = document.querySelector('.remember');
      const rem = document.getElementById('a');
      const confirmlog = document.querySelector('.confirm');
      const confirmsign = document.querySelector('.confirmSignup');
      const myPic = document.querySelector('.myPic');

       ////چک خالی نبودن اینپوت ها////
        function showError(msg) {
  const err = document.getElementById('errorMsg');
  err.textContent = msg;
  err.classList.remove('hidden');
  setTimeout(() => err.classList.add('hidden'), 2000);
}
///////////////
       function validatePassword(pass) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(pass);
}
////////sign up ///////


   document.querySelector('.reg').addEventListener('click', () => {
     
         async function register() {
        const person = {
          email: inp[0].value,
          phone: inp[1].value,
          pass: inp[2].value,
        };
        ////چک خالی نبودن اینپوت ها////
   
if (!inp[0].value || !inp[1].value || !inp[2].value) {
  showError('همه فیلدها را پر کنید');
  return;
}
        ////////
        try {
          const url = new URL(
            'https://6a379f4fc105017aa639228e.mockapi.io/name',
          );
          if (!validatePassword(inp[2].value)) {
  showError('پسورد باید حداقل 8 کاراکتر، حرف بزرگ، کوچک، عدد و کاراکتر خاص داشته باشه');
  return;
}

          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(person),
          });

          if (res.ok) {
            const data = await res.json();
            console.log('ثبت نام موفق', data);
          } else {
            throw new Error('not ok...');
          }
          log.style.display = 'block';
          regbtn.style.display = 'none';
        } catch (err) {
          console.log('not ok' + err);
        }
        inp[1].style.display = 'none';
        boxrem.style.display = 'block';
           exist.style.display = 'none';
        toptext.style.display = 'none';
       
      }
      
          register()
})
   
      ///////////////signin or signup///////
      async function openLogin() {
        log.style.display = 'block';
        regbtn.style.display = 'none';
        inp[1].style.display = 'none';
        boxrem.style.display = 'block';
        confirmlog.style.display = 'none';
        // exist.style.display = 'none';
        exist.innerHTML=''
        toptext.style.display = 'none';
        // confirmsign.style.display = 'block';
        confirmsign.classList.remove('hidden')
        
      }
      async function openSignup() {
        log.style.display ='none';
        regbtn.style.display = 'block';
        inp[1].style.display = 'block';
        boxrem.style.display = 'none';
        confirmlog.style.display = 'block';
        exist.style.display = 'block';
        toptext.style.display = 'block';
        exist.innerHTML='Create Account'
        confirmsign.style.display = 'none';
      
        
      }
      ///////////login////////////
      async function login() {
        const person = {
          email: inp[0].value,
          pass: inp[2].value,
        };

       if (!inp[0].value || !inp[2].value) {
  showError('همه فیلدها را پر کنید');
  return;
}

        try {
          const url = new URL(
            'https://6a379f4fc105017aa639228e.mockapi.io/name',
          );
          const res = await fetch(url, { method: 'GET' });

          if (res.ok) {
            const data = await res.json();
            const found = data.find(
              (user) =>
                (user.email === inp[0].value || user.phone === inp[0].value) &&
                user.pass === inp[2].value,
            );
            if (found) {
              box.style.display = 'none';
              outbtn.style.display = 'block';
               confirmlog.style.display = 'none';
              ////////remember////////
              if (rem.checked) {
                localStorage.setItem('user', JSON.stringify(found));
              }

              _h.innerHTML = ' welcome ' + found.email;

              const table = document.createElement('table');
              table.innerHTML = `
                 <tr>
                   <td>${found.email}</td>
                   <td>${found.phone}</td>
                   <td><img src="${found.avatar}"></td>
                   <td onclick='edit(${found.id})'>edit</td>
                   <td onclick='deletUser(${found.id})'>delete</td>
                 </tr>
               `;
              _h.innerHTML = 'welcome ' + found.email;

              const wrapper = document.createElement('div');
              wrapper.className = 'table-wrapper';
               wrapper.appendChild(table);
              document.querySelector('.logout').appendChild(wrapper);
              myPic.style.display='none'
            } else {
                 
                  // showError('نام کاربری یا رمز اشتباهه');
                    showError('نام کاربری یا رمز عبور اشتباهه');
                   console.log('نام کاربری یا رمز اشتباهه');
                  
            }
          } else {
            throw new Error('مشکل از سرور');
          }
        } catch (err) {
          console.log('Error ....');
        }
        
      }

      ////// auto login/////
      window.onload = () => {
        const user = localStorage.getItem('user');
        if (user) {
          const data = JSON.parse(user);
          console.log('خوش اومدی دوباره ' + data.email);
          box.style.display = 'none';
          outbtn.style.display = 'block';
          _h.innerHTML = 'welcome ' + data.email;
          const table = document.createElement('table');
          table.innerHTML = `
          <tr>
             <td>${data.email}</td>
  <td>${data.phone}</td>
  <td><img src="${data.avatar}"></td>
  <td onclick='edit(${data.id})'>edit</td>
  <td onclick='deletUser(${data.id})'>delete</td>
          </tr>`;
          document.querySelector('.logout').appendChild(table);
          myPic.style.display='none'
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper';
          wrapper.appendChild(table);
          document.querySelector('.logout').appendChild(wrapper);
        }
      };

      ///////////log out /////

      function logout() {
        localStorage.removeItem('user');
        box.style.display = 'flex';
        outbtn.style.display = 'none';
        regbtn.style.display = 'none';
        log.style.display = 'block';
        inp[1].style.display = 'none';
        boxrem.style.display = 'block';
        confirmlog.style.display = 'none';
        pop.style.display = 'none';
        myPic.style.display='flex'
         confirmsign.style.display = 'block';

       const wrapper = document.querySelector('.table-wrapper');
        if (wrapper) wrapper.remove();
        inp[0].value = ''
        inp[2].value = ''
        _h.innerHTML = '';
      }
      ////////edit//////

      function edit(id) {
        pop.style.display = 'block';
         document.getElementById('overlay').style.display = 'block';
         document.getElementById('saveBtn').onclick = () => saveEdit(id);
      }
      ///////fn saveEdit///////
      async function saveEdit(id) {
        /////  خالی موندن در ادیت اطلاعات قبلی////////
        const user = JSON.parse(localStorage.getItem('user'));
        const updatedData = {
          email: newInp[0].value || user.email,
          phone: newInp[1].value || user.phone,
          pass: newInp[2].value || user.pass,
        };

        try {
          const res = await fetch(
            `https://6a379f4fc105017aa639228e.mockapi.io/name/${id}`,
            {
              method: 'PUT', // or PATCH
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(updatedData),
            },
          );

         if (res.ok) {
  const data = await res.json();
  localStorage.setItem('user', JSON.stringify(data));
  console.log('ادیت موفق', data);

  pop.style.display = 'none';
  document.getElementById('overlay').style.display = 'none';

  const tds = document.querySelector('table').querySelectorAll('td');

  tds[0].textContent = data.email;
  tds[1].textContent = data.phone;
  tds[2].innerHTML = `<img src="${data.avatar}">`;

} else {
  throw new Error('edit error');
}
        } catch (err) {
          console.log(err);
        }
      }
      //////////delete ////

      async function deletUser(id) {
  if (!confirm('Are you sure?')) return;
  try {
    const res = await fetch(`https://6a379f4fc105017aa639228e.mockapi.io/name/${id}`, { method: 'DELETE' });
    if (res.ok) logout();
  } catch (err) {
    console.log('delete error', err);
  }
}