<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><a href="javascript: void(0)">Management</a></li>
              <li class="breadcrumb-item" aria-current="page">Setup Package</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Setup Package</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ breadcrumb ] end -->

    <!-- [ Main Content ] start -->
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5>Daftar Package Qurban</h5>
            <button class="btn btn-primary" @click="openModal">
              <i class="ti ti-plus me-1"></i> Add Package
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hewan (Tipe)</th>
                    <th>Negara</th>
                    <th>Harga</th>
                    <th>Max Share</th>
                    <th>Status</th>
                    <th class="text-end">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pkg, index) in packages" :key="pkg.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <span class="text-capitalize">{{ pkg.animal_type }}</span>
                    </td>
                    <td>{{ pkg.country }}</td>
                    <td>Rp {{ pkg.price.toLocaleString('id-ID') }}</td>
                    <td>{{ pkg.max_share }} Orang</td>
                    <td>
                      <span :class="['badge', pkg.status === 'A' ? 'bg-light-success text-success' : 'bg-light-danger text-danger']">
                        {{ pkg.status === 'A' ? 'Active' : (pkg.status === 'I' ? 'Inactive' : pkg.status) }}
                      </span>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-light-secondary me-1" title="Edit">
                        <i class="ti ti-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-light-danger" title="Hapus">
                        <i class="ti ti-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="packages.length === 0">
                    <td colspan="7" class="text-center text-muted py-4">Belum ada data package.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ Main Content ] end -->

    <!-- Modal Add/Edit (Bootstrap Modal) -->
    <div class="modal fade" id="packageModal" tabindex="-1" aria-labelledby="packageModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="packageModalLabel">Add New Package</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="packageForm" @submit.prevent="savePackage">
              <div class="mb-3">
                <label class="form-label">Tipe Hewan</label>
                <input type="text" class="form-control" v-model="form.animal_type" placeholder="Contoh: cow, goat, sheep" required>
                <small class="text-muted">Harus salah satu dari: goat, sheep, cow (sesuai backend saat ini).</small>
              </div>
              <div class="mb-3">
                <label class="form-label">Negara</label>
                <input type="text" class="form-control" v-model="form.country" placeholder="Contoh: Indonesia" required maxlength="100">
              </div>
              <div class="mb-3">
                <label class="form-label">Harga (Rp)</label>
                <input type="number" class="form-control" v-model="form.price" placeholder="2500000" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Max Share (Jumlah Orang)</label>
                <input type="number" class="form-control" v-model="form.max_share" placeholder="1" required min="1">
                <small class="text-muted">Misal: 7 untuk sapi, 1 untuk kambing.</small>
              </div>
              <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea class="form-control" v-model="form.description" rows="3" placeholder="Deskripsi paket..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" form="packageForm" class="btn btn-primary">Save Package</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface PackageData {
  id: number;
  animal_type: string;
  country: string;
  price: number;
  max_share: number;
  description: string;
  status: string;
}

const packages = ref<PackageData[]>([])

const form = ref({
  animal_type: '',
  country: '',
  price: 0,
  max_share: 1,
  description: ''
})

let modalInstance: any = null

const fetchPackages = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/packages')
    const result = await response.json()
    if (result.success) {
      packages.value = result.data
    }
  } catch (error) {
    console.error('Failed to fetch packages:', error)
  }
}

onMounted(() => {
  // Initialize bootstrap modal
  if ((window as any).bootstrap) {
    modalInstance = new (window as any).bootstrap.Modal(document.getElementById('packageModal'))
  }
  
  // Ambil data dari backend saat halaman dimuat
  fetchPackages()
})

const openModal = () => {
  form.value = { 
    animal_type: '', 
    country: '', 
    price: 0, 
    max_share: 1, 
    description: '' 
  }
  if (modalInstance) {
    modalInstance.show()
  }
}

const savePackage = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    const result = await response.json()
    
    if (response.ok && result.success) {
      // Refresh data di tabel dengan mengambil ulang dari backend
      await fetchPackages()
      
      if (modalInstance) {
        modalInstance.hide()
      }
      alert('Package berhasil disimpan ke database!');
    } else {
      alert('Gagal menyimpan: ' + (result.message || 'Cek kembali data Anda'));
      console.error(result.errors);
    }
  } catch (error) {
    console.error('Failed to save package:', error)
    alert('Gagal terhubung ke server backend');
  }
}
</script>
