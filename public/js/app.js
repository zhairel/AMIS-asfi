document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link, .btn-donate-nav').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    // 1. Interactive Amount Selector Buttons
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');

    amountBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            amountBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (customAmountInput) {
                customAmountInput.value = this.getAttribute('data-amount');
            }
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', function () {
            amountBtns.forEach(b => b.classList.remove('active'));
        });
    }

    // 2. Donation Modal Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');

            this.classList.add('active');
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.style.display = 'block';
            }
        });
    });

    // 3. One-Click Copy Account Number to Clipboard
    const copyBtns = document.querySelectorAll('.btn-copy');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const num = this.getAttribute('data-num');
            if (navigator.clipboard && num) {
                navigator.clipboard.writeText(num).then(() => {
                    showToast(`Copied ${num} to clipboard!`);
                }).catch(() => {
                    fallbackCopyText(num);
                });
            } else if (num) {
                fallbackCopyText(num);
            }
        });
    });

    function fallbackCopyText(text) {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`Copied ${text} to clipboard!`);
    }

    // 4. Toast Notification
    function showToast(msg) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✅</span> ${msg}`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 5. Form Submissions (Pledge & Volunteer)
    const pledgeForm = document.getElementById('pledgeForm');
    if (pledgeForm) {
        pledgeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('donorName').value;
            const amount = document.getElementById('customAmount').value;
            showToast(`JazakAllah Khair ${name}! Your pledge of ₱${amount} has been received.`);
            this.reset();
        });
    }

    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const vName = document.getElementById('volName').value;
            showToast(`Thank you ${vName}! Our ASFI team will contact you soon.`);
            this.reset();
        });
    }
});
