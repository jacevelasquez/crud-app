const addButton = document.getElementById("addButton");
const editDiv = document.getElementById("editDiv");
const pageListDiv = document.getElementById("pageListDiv");
const pageNumDiv = document.getElementById("pageNumDiv");
const addDiv = document.getElementById("addDiv");

const addEvent = () => {
    addDiv.classList.add("shown");
    const forHide = [addButton, editDiv, pageListDiv, pageNumDiv];
    for(let i=0; i<forHide.length; i++)
      forHide[i].classList.add("hidden");
  }

  const insertCrud = () => {
    const addName = document.getElementById("addName");
    const addDesc = document.getElementById("addDesc");
    const addStatus = document.getElementById("addStatus");

    const resp = fetch('http://localhost:8080/insert', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: addName.value,
        description: addDesc.value,
        status: addStatus.value,
        })
    });
    location.reload();
  }

  const editEvent = (ar) => {
    editDiv.classList.add("shown");
    const forHide = [addButton, pageListDiv, addDiv, pageNumDiv];
    for(let i=0; i<forHide.length; i++)
      forHide[i].classList.add("hidden");
      
    document.getElementById('editName').value = ar.name;
    document.getElementById('editDesc').value = ar.description;
    document.getElementById('editStatus').value = ar.status;
    document.getElementById('editDate').innerHTML  = ar.timestamp;
    document.getElementById('hiddenId').value = ar.id;
  }

  const editCrud = () => {
    const editName = document.getElementById("editName").value;
    const hiddenId = document.getElementById("hiddenId").value;
    const editStatus = document.getElementById("editStatus").value;
    const editDesc = document.getElementById("editDesc").value;
    const date = new Date();

    const resp = fetch(`http://localhost:8080/edit/${hiddenId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        id: hiddenId,
        name: editName,
        status: editStatus,
        description: editDesc,
        date: date,
        })
    })
    location.reload()
  }

  const deleteCrud = (id) => {
    alert('DELETING id:'+id+'');

    const resp = fetch(`http://localhost:8080/delete/${id}`, {
        method: 'DELETE'
    })
    location.reload()
  }

  const goBack = () => {
    location.reload();
  }

  // pagination code
  const paginationNumbers = document.getElementById("pageNumDiv");
  const paginatedList = document.getElementById("pageListDiv");
  let listItems = undefined;
  if(paginatedList)
    listItems = paginatedList.querySelectorAll("li");

  const paginationLimit = 5;
  const pageCount = Math.ceil(9 / paginationLimit);
  let currentPage = 1;

  const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
  };

  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };

  const setCurrentPage = (pageNum) => {
    currentPage = pageNum;
    handleActivePageNumber();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
  };

  window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));

      if (pageIndex) {
        button.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  });

  module.exports = {
    addEvent,
  }