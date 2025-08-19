document.addEventListener('DOMContentLoaded', function () {
    const formPages = document.querySelectorAll('.form-page');
    const stepCircles = document.querySelectorAll('.step-circle');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const progressBar = document.getElementById('progress-bar');
    let currentPage = 1;

    // File upload functionality
    setupFileUpload('photoUploadContainer', 'photoUpload', 'photoPreview');
    setupFileUpload('panUploadContainer', 'panUpload', 'panPreview');
    setupFileUpload('bankUploadContainer', 'bankUpload', 'bankPreview');

    function setupFileUpload(containerId, inputId, previewId) {
        const container = document.getElementById(containerId);
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        container.addEventListener('click', () => {
            input.click();
        });

        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            container.style.borderColor = '#4361ee';
            container.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        });

        container.addEventListener('dragleave', () => {
            container.style.borderColor = '#dee2e6';
            container.style.backgroundColor = 'transparent';
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.style.borderColor = '#dee2e6';
            container.style.backgroundColor = 'transparent';

            if (e.dataTransfer.files.length) {
                input.files = e.dataTransfer.files;
                handleFileSelect(input, preview);
            }
        });

        input.addEventListener('change', () => {
            handleFileSelect(input, preview);
        });
    }

    function handleFileSelect(input, preview) {
        const file = input.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                preview.style.display = 'none';
            }
        }
    }

    // Initialize progress
    updateProgress();

    // Navigation functions
    function showPage(pageNumber) {
        formPages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`page${pageNumber}`).classList.add('active');
        currentPage = pageNumber;

        // Update step indicators
        stepCircles.forEach(circle => {
            circle.classList.remove('active');
            if (parseInt(circle.dataset.page) === pageNumber) {
                circle.classList.add('active');
            }
        });

        // Update button states
        prevBtn.disabled = (pageNumber === 1);
        nextBtn.style.display = (pageNumber === 6) ? 'none' : 'flex';
        submitBtn.classList.toggle('d-none', pageNumber !== 6);

        updateProgress();

        // Special handling for review page
        if (pageNumber === 6) {
            generateReviewContent();
        }
    }

    function validatePage(pageNumber) {
        switch (pageNumber) {
            case 1:
                return document.getElementById('firstName').value.trim() !== '' &&
                    document.getElementById('lastName').value.trim() !== '' &&
                    document.getElementById('email').value.trim() !== '' &&
                    document.getElementById('phone').value.trim() !== '' &&
                    document.getElementById('address').value.trim() !== '' &&
                    document.getElementById('city').value.trim() !== '' &&
                    document.getElementById('pincode').value.trim() !== '';
            case 2:
                return document.getElementById('bankName').value.trim() !== '' &&
                    document.getElementById('accountNumber').value.trim() !== '' &&
                    document.getElementById('ifscCode').value.trim() !== '' &&
                    document.getElementById('branch').value.trim() !== '' &&
                    document.getElementById('panNumber').value.trim() !== '';
            case 3:
                return true; // Tax page validation can be added if needed
            case 4:
                return true; // Superannuation page validation can be added if needed
            case 5:
                return document.getElementById('employeeName').value.trim() !== '' &&
                    document.getElementById('role').value.trim() !== '' &&
                    document.getElementById('joinDate').value.trim() !== '' &&
                    document.getElementById('salary').value.trim() !== '';
            default:
                return true;
        }
    }

    function updateProgress() {
        const progressPercentage = ((currentPage - 1) / 5) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function generateReviewContent() {
        const reviewContent = document.getElementById('review-content');

        // Get all form values
        const firstName = document.getElementById('firstName').value || 'Not provided';
        const lastName = document.getElementById('lastName').value || 'Not provided';
        const dob = document.getElementById('dob').value || 'Not provided';
        const email = document.getElementById('email').value || 'Not provided';
        const phoneCode = document.getElementById('phoneCode').value || '';
        const phone = document.getElementById('phone').value || 'Not provided';
        const altPhoneCode = document.getElementById('altPhoneCode').value || '';
        const altPhone = document.getElementById('altPhone').value || 'Not provided';
        const fatherName = document.getElementById('fatherName').value || 'Not provided';
        const motherName = document.getElementById('motherName').value || 'Not provided';
        const address = document.getElementById('address').value || 'Not provided';
        const state = document.getElementById('state').options[document.getElementById('state').selectedIndex].text || 'Not provided';
        const city = document.getElementById('city').value || 'Not provided';
        const pincode = document.getElementById('pincode').value || 'Not provided';

        const bankName = document.getElementById('bankName').value || 'Not provided';
        const accountNumber = document.getElementById('accountNumber').value || 'Not provided';
        const ifscCode = document.getElementById('ifscCode').value || 'Not provided';
        const branch = document.getElementById('branch').value || 'Not provided';
        const panNumber = document.getElementById('panNumber').value || 'Not provided';

        const taxFileNumber = document.getElementById('taxFileNumber').value || 'Not provided';
        const declarationDate = document.getElementById('declarationDate').value || 'Not provided';
        const taxFree = document.querySelector('input[name="taxFree"]:checked').value === 'yes' ? 'Yes' : 'No';
        const taxResident = document.getElementById('taxResident').options[document.getElementById('taxResident').selectedIndex].text || 'Not provided';
        const taxOffset = document.getElementById('taxOffset').options[document.getElementById('taxOffset').selectedIndex].text || 'Not provided';
        const additionalTaxInfo = document.getElementById('additionalTaxInfo').value || 'Not provided';

        const fundName = document.getElementById('fundName').value || 'Not provided';
        const accountName = document.getElementById('accountName').value || 'Not provided';
        const membershipNumber = document.getElementById('membershipNumber').value || 'Not provided';
        const fundAbn = document.getElementById('fundAbn').value || 'Not provided';
        const fundSpin = document.getElementById('fundSpin').value || 'Not provided';
        const fundBsb = document.getElementById('fundBsb').value || 'Not provided';
        const fundAccountNumber = document.getElementById('fundAccountNumber').value || 'Not provided';
        const fundContact = document.getElementById('fundContact').value || 'Not provided';
        const fundTel = document.getElementById('fundTel').value || 'Not provided';

        const employeeName = document.getElementById('employeeName').value || 'Not provided';
        const role = document.getElementById('role').value || 'Not provided';
        const joinDate = document.getElementById('joinDate').value || 'Not provided';
        const salary = document.getElementById('salary').value ? '$' + document.getElementById('salary').value : 'Not provided';
        const salaryType = document.getElementById('salaryType').options[document.getElementById('salaryType').selectedIndex].text || 'Not provided';
        const houseRent = document.getElementById('houseRent').value ? '$' + document.getElementById('houseRent').value : 'Not provided';
        const award = document.getElementById('award').value || 'Not provided';
        const employmentMode = document.querySelector('input[name="employmentMode"]:checked').value || 'Not provided';
        const workingDays = document.getElementById('workingDays').options[document.getElementById('workingDays').selectedIndex].text || 'Not provided';
        const leaves = document.querySelector('input[name="leaves"]:checked').value || 'Not provided';
        const additionalInfo = document.getElementById('additionalInfo').value || 'Not provided';

        let html = `
                    <h4 class="mb-3">Personal Details</h4>
                    <div class="d-flex review-item">
                        <div class="review-label">Name:</div>
                        <div>${firstName} ${lastName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Date of Birth:</div>
                        <div>${dob}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Email:</div>
                        <div>${email}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Phone:</div>
                        <div>${phoneCode} ${phone}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Alternate Phone:</div>
                        <div>${altPhone ? altPhoneCode + ' ' + altPhone : 'Not provided'}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Father's Name:</div>
                        <div>${fatherName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Mother's Name:</div>
                        <div>${motherName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Address:</div>
                        <div>${address}, ${city}, ${state} ${pincode}</div>
                    </div>
                    
                    <h4 class="mb-3 mt-4">Account Details</h4>
                    <div class="d-flex review-item">
                        <div class="review-label">Bank Name:</div>
                        <div>${bankName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Account Number:</div>
                        <div>${accountNumber}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">IFSC Code:</div>
                        <div>${ifscCode}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Branch:</div>
                        <div>${branch}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">PAN Number:</div>
                        <div>${panNumber}</div>
                    </div>
                    
                    <h4 class="mb-3 mt-4">Tax Details</h4>
                    <div class="d-flex review-item">
                        <div class="review-label">Tax File Number:</div>
                        <div>${taxFileNumber}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Declaration Date:</div>
                        <div>${declarationDate}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Claim Tax-Free:</div>
                        <div>${taxFree}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Tax Resident Status:</div>
                        <div>${taxResident}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Tax Offset Eligibility:</div>
                        <div>${taxOffset}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Additional Tax Info:</div>
                        <div>${additionalTaxInfo}</div>
                    </div>
                    
                    <h4 class="mb-3 mt-4">Superannuation Details</h4>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund Name:</div>
                        <div>${fundName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Account Name:</div>
                        <div>${accountName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Membership Number:</div>
                        <div>${membershipNumber}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund ABN:</div>
                        <div>${fundAbn}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund SPIN:</div>
                        <div>${fundSpin}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund BSB:</div>
                        <div>${fundBsb}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund Account Number:</div>
                        <div>${fundAccountNumber}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund Contact:</div>
                        <div>${fundContact}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Fund Telephone:</div>
                        <div>${fundTel}</div>
                    </div>
                    
                    <h4 class="mb-3 mt-4">Employment Details</h4>
                    <div class="d-flex review-item">
                        <div class="review-label">Employee Name:</div>
                        <div>${employeeName}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Role/Position:</div>
                        <div>${role}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Join Date:</div>
                        <div>${joinDate}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Salary:</div>
                        <div>${salary} (${salaryType})</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">House Rent Allowance:</div>
                        <div>${houseRent}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Award & Classification:</div>
                        <div>${award}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Employment Mode:</div>
                        <div>${employmentMode}</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Working Days:</div>
                        <div>${workingDays} days per week</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Leaves:</div>
                        <div>${leaves} days per year</div>
                    </div>
                    <div class="d-flex review-item">
                        <div class="review-label">Additional Info:</div>
                        <div>${additionalInfo}</div>
                    </div>
                `;

        reviewContent.innerHTML = html;
    }

    // Step circle click event
    stepCircles.forEach(circle => {
        circle.addEventListener('click', function () {
            const pageNumber = parseInt(this.dataset.page);
            if (pageNumber <= currentPage) {
                showPage(pageNumber);
            }
        });
    });

    // Button event listeners
    nextBtn.addEventListener('click', function () {
        if (validatePage(currentPage)) {
            if (currentPage < 6) {
                showPage(currentPage + 1);
            }
        } else {
            alert('Please fill in all required fields before proceeding.');
        }
    });

    prevBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (document.getElementById('terms').checked) {
            // Generate confirmation details
            const confirmationDetails = document.getElementById('confirmation-details');
            confirmationDetails.innerHTML = `
                        <div class="d-flex review-item">
                            <div class="review-label">Name:</div>
                            <div>${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</div>
                        </div>
                        <div class="d-flex review-item">
                            <div class="review-label">Email:</div>
                            <div>${document.getElementById('email').value}</div>
                        </div>
                        <div class="d-flex review-item">
                            <div class="review-label">Employee ID:</div>
                            <div>EMP-${Math.floor(10000 + Math.random() * 90000)}</div>
                        </div>
                        <div class="d-flex review-item">
                            <div class="review-label">Submitted On:</div>
                            <div>${new Date().toLocaleString()}</div>
                        </div>
                    `;

            // Show confirmation page
            document.querySelector('.form-page.active').classList.remove('active');
            document.getElementById('confirmation-page').style.display = 'block';

            // Hide the navigation bar
            document.querySelector('.onboarding-nav').style.display = 'none';
        } else {
            alert('Please agree to the terms and conditions before submitting.');
        }
    });

    cancelBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to cancel? All your progress will be lost.')) {
            document.querySelector('.onboarding-nav').style.display = 'none';
            document.querySelector('.form-page.active').classList.remove('active');
            document.getElementById('confirmation-page').style.display = 'block';
            document.getElementById('confirmation-page').innerHTML = `
                        <div class="text-center py-5">
                            <div class="mb-4" style="font-size: 4rem; color: #dc3545;">
                                <i class="bi bi-x-circle-fill"></i>
                            </div>
                            <h2 class="h4 mb-3">Onboarding Cancelled</h2>
                            <p class="mb-4">Your employee onboarding process has been cancelled.</p>
                            <button class="btn btn-primary" onclick="location.reload()">
                                Start Over
                            </button>
                        </div>
                    `;
        }
    });

    // Add form validation on input
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function () {
            if (validatePage(currentPage)) {
                nextBtn.classList.remove('btn-secondary');
                nextBtn.classList.add('btn-next');
            } else {
                nextBtn.classList.remove('btn-next');
                nextBtn.classList.add('btn-secondary');
            }
        });
    });
});