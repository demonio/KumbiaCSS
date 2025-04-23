(function() {
    const KumbiaJS = {
        aAjax: function(eve) {
            eve.preventDefault();
            const mensaje = this.dataset.confirm;
            if (mensaje && !confirm(mensaje)) {
                return false;
            }
            const to = document.querySelector(this.dataset.ajax);
            fetch(this.href)
                .then(response => response.text())
                .then(data => {
                    to.innerHTML = data;
                    console.log([to, this.href]);
                })
                .catch(error => console.error('Error:', error));
        },

        active: function() {
            const to = document.querySelector(this.dataset.active);
            to.classList.remove('active');
            this.classList.add('active');
        },

        alert: function() {
            alert(this.dataset.alert);
        },

        checkbox: function() {
            if (this.readOnly) {
                this.checked = this.readOnly = false;
            } else if (!this.checked) {
                this.readOnly = this.indeterminate = true;
            }
        },

        clone_content_append: function() {
            const params = this.dataset.clone_content_append.split(', ');
            const el = document.querySelector(params[0]);
            const to = document.querySelector(params[1]);
            console.log([params, el, to]);
            if (el instanceof HTMLTemplateElement) {
                const clone = document.importNode(el.content, true);
                to.appendChild(clone);
            }
        },

        confirm: function(eve) {
            if (!confirm(this.dataset.confirm)) {
                eve.preventDefault();
                eve.stopImmediatePropagation();
            }
        },

        effect: function(effect) {
            return function() {
                const to = document.querySelector(this.dataset[effect]);
                to.style[effect]();
            }
        },

        formAjax: function(eve) {
            eve.preventDefault();

            const form = this.closest('form');
            const url = form.getAttribute('action');
            let to;
            if (form.dataset.ajaxAppend) {
                to = document.querySelector(form.dataset.ajaxAppend);
            } else if (form.dataset.ajaxPrepend) {
                to = document.querySelector(form.dataset.ajaxPrepend);
            } else {
                to = document.querySelector(form.dataset.ajax);
            }
            const formData = new FormData(form);

            const buttons = form.querySelectorAll('[type="submit"]');
            buttons.forEach(button => button.setAttribute('disabled', 'disabled'));

            const btnName = this.getAttribute('name');
            if (btnName !== undefined) {
                const btnVal = this.value;
                formData.append(btnName, btnVal);
            }

            const fileData = form.querySelector('[type="file"]');
            if (fileData) {
                formData.append('file', fileData.files[0]);
            }

            fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    let mode;
                    if (form.dataset.ajaxAppend) {
                        to.innerHTML += data;
                        mode = 'append';
                    } else if (form.dataset.ajaxPrepend) {
                        to.innerHTML = data + to.innerHTML;
                        mode = 'prepend';
                    } else {
                        to.innerHTML = data;
                        mode = 'normal';
                    }
                    buttons.forEach(button => button.removeAttribute('disabled'));
                    console.log([to, url, mode]);
                })
                .catch(error => console.error('Error:', error));
        },

        live: function() {
            const to = document.querySelector(this.dataset.live);
            const href = this.dataset.href;
            fetch(href, { method: 'POST', body: JSON.stringify({ 'keywords': this.value }) })
                .then(response => response.text())
                .then(data => {
                    to.innerHTML = data;
                    console.log([to, href, this.value]);
                })
                .catch(error => console.error('Error:', error));
        },

        remove: function() {
            const to = this.dataset.remove === 'parent' ? this.parentElement : document.querySelector(this.dataset.remove);
            to.remove();
        },

        selectAjax: function() {
            const to = document.querySelector(this.dataset.ajax);
            const href = this.dataset.href + this.value;
            fetch(href)
                .then(response => response.text())
                .then(data => {
                    to.innerHTML = data;
                    console.log([to, href]);
                })
                .catch(error => console.error('Error:', error));
        },

        selectRedirect: function() {
            const href = this.dataset.redirect + this.value;
            location.href = href;
        },

        selectToggle: function() {
            const to = document.querySelector(this.dataset.changeToggle);
            to.style.display = to.style.display === 'none' ? 'block' : 'none';
        },

        style: function() {
            const params = this.dataset.style.split(', ');
            const selector = params[0];
            const style = params[1];
            document.querySelector(selector).setAttribute('style', style);
        },

        toggleClass: function() {
            const params = this.dataset.toggleClass.split(', ');
            const className = params[0];
            const to = document.querySelector(params[1]);
            to.classList.toggle(className);
        },

        toggleDisplay: function() {
            const to = document.querySelector(this.dataset.toggleDisplay);
            if (window.getComputedStyle(to).display === 'none') {
                to.style.display = 'flex';
            } else {
                to.style.display = 'none';
            }
        },

        bind: function() {
            window.addEventListener('load', function(event) {
                const checkboxes = document.querySelectorAll('input[type="checkbox"][readonly]');
                checkboxes.forEach(function(checkbox) {
                    checkbox.indeterminate = true;
                });
            });

            document.body.addEventListener('click', function(event) {
                const target = event.target;
                if (target.matches('[data-active]')) KumbiaJS.active.call(target);
                if (target.matches('a[data-ajax]')) KumbiaJS.aAjax.call(target);
                if (target.matches('[type="checkbox"]:not([id*="switch-"])')) KumbiaJS.checkbox.call(target);
                if (target.matches('form[data-ajax] [type="submit"]')) KumbiaJS.formAjax.call(target);
                if (target.matches('form[data-ajax_append] [type="submit"]')) KumbiaJS.formAjax.call(target);
                if (target.matches('form[data-ajax_prepend] [type="submit"]')) KumbiaJS.formAjax.call(target);
                if (target.matches('select[data-ajax]')) KumbiaJS.selectAjax.call(target);
                if (target.matches('select[data-redirect]')) KumbiaJS.selectRedirect.call(target);
                if (target.matches('select[data-change_toggle]')) KumbiaJS.selectToggle.call(target);
                if (target.matches('[data-alert]')) KumbiaJS.alert.call(target);
                if (target.matches('[data-click]')) KumbiaJS.effect('click').call(target);
                if (target.matches('[data-clone_content_append]')) KumbiaJS.clone_content_append.call(target);
                if (target.matches('[data-confirm]')) KumbiaJS.confirm.call(target);
                if (target.matches('[data-fade_out]')) KumbiaJS.effect('fadeOut').call(target);
                if (target.matches('[data-hide]')) KumbiaJS.effect('hide').call(target);
                if (target.matches('[data-live]')) KumbiaJS.live.call(target);
                if (target.matches('[data-remove]')) KumbiaJS.remove.call(target);
                if (target.matches('[data-show]')) KumbiaJS.effect('show').call(target);
                if (target.matches('[data-slide_down]')) KumbiaJS.effect('slideDown').call(target);
                if (target.matches('[data-style]')) KumbiaJS.style.call(target);
                if (target.matches('[data-toggle]')) KumbiaJS.effect('toggle').call(target);
                if (target.matches('[data-toggle_class]')) KumbiaJS.toggleClass.call(target);
                if (target.matches('[data-toggle_display]')) KumbiaJS.toggleDisplay.call(target);
            });
        }
    };
    KumbiaJS.bind();
})();