  <template>
    <div class="container-fluid px-0 bg-light min-vh-100">
      <div class="w-100 p-4">

        <CCard class="shadow-sm w-100 mb-4 border-0">
          <CCardHeader class="bg-primary text-white py-3">
            <h5 class="m-0 font-weight-bold">
              <CIcon name="cil-file" class="mr-2" /> 1-4) ข้อมูลทั่วไปของโครงการ
            </h5>
          </CCardHeader>
          <CCardBody class="p-4 bg-white">
            <CRow>
              <CCol md="12" class="mb-4">
                <h5 class="font-weight-bold text-dark mb-3">1) ชื่อโครงการ *</h5>
                <div class="p-3 border rounded bg-light shadow-sm">
                  <CInput label="ชื่อโครงการ (ภาษาไทย)" v-model="form.titleTH" placeholder="กรุณาระบุชื่อโครงการภาษาไทย"
                    class="mb-3" />
                  <CInput label="ชื่อโครงการ (ภาษาอังกฤษ)" v-model="form.titleEN" placeholder="Project Title in English"
                    class="mb-0" />
                </div>
              </CCol>

              <CCol md="12" class="mb-4">
                <h5 class="font-weight-bold text-dark mb-3">2) ประเภททุน *</h5>
                <div class="d-flex flex-wrap border rounded p-3 bg-white shadow-sm" style="gap: 20px;">
                  <div v-for="type in budgetTypes" :key="type.value" class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" :id="'type-' + type.value" :value="type.label"
                      v-model="form.budgetType">
                    <label class="custom-control-label font-weight-bold" :for="'type-' + type.value"
                      style="cursor: pointer;">
                      {{ type.label }}
                    </label>
                  </div>
                </div>
              </CCol>

              <CCol lg="6" md="12" class="mb-4">
                <h5 class="font-weight-bold text-dark mb-3">3) ความร่วมมือ *</h5>
                <CSelect :options="['ไม่มี', 'มี']" v-model:value="form.cooperation" />

                <div v-if="form.cooperation === 'มี'" class="mt-3">
                  <CInput label="รายละเอียดความร่วมมือ" v-model="form.cooperationDetail"
                    placeholder="ระบุหน่วยงานที่ร่วมมือ" />
                </div>
              </CCol>

              <CCol lg="6" md="12" class="mb-4">
                <h5 class="font-weight-bold text-dark mb-3">4) ประเภทงานวิจัย *</h5>
                <CSelect :options="researchTypeOptions" v-model:value="form.researchType" class="shadow-sm" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <!-- ---------------------------------------------------------------------- -->
        <CCard class="shadow-sm w-100 mb-4 border-0">
          <CCardHeader class="bg-primary text-white py-3">
            <h5 class="m-0 font-weight-bold">
              <CIcon name="cil-people" class="mr-2" /> ส่วน ก) : สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย
            </h5>
          </CCardHeader>
          <CCardBody class="p-4">
            <h5 class="font-weight-bold mb-4 text-dark">1) คณะผู้วิจัย</h5>

            <div class="border rounded p-4 mb-4 bg-light shadow-sm w-100">
              <h6 class="font-weight-bold text-primary mb-3 border-bottom pb-2">
                <CIcon name="cil-user" class="mr-2" /> 1.1 หัวหน้าโครงการวิจัย
              </h6>
              <CRow>
                <CCol lg="4" md="6">
                  <CInput label="ชื่อ-นามสกุล *" v-model="form.researchers.mainResearcher.name" />
                </CCol>
                <CCol lg="4" md="6">
                  <CInput label="สังกัดหน่วยงาน *" v-model="form.researchers.mainResearcher.affiliation" />
                </CCol>
                <CCol lg="4" md="6">
                  <CInput label="เบอร์โทรศัพท์ *" v-model="form.researchers.mainResearcher.phone" />
                </CCol>
                <CCol lg="6" md="6">
                  <CInput label="E-mail address *" v-model="form.researchers.mainResearcher.email" type="email" />
                </CCol>
                <CCol lg="6" md="12">
                  <CInput label="สัดส่วนการวิจัย (%) *" v-model="form.researchers.mainResearcher.code" type="number" />
                </CCol>
              </CRow>
            </div>

            <div class="border rounded p-4 mb-4 bg-white shadow-sm border-success w-100">
              <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <h6 class="font-weight-bold text-success mb-0">
                  <CIcon name="cil-people" class="mr-2" /> 1.2 ผู้ร่วมโครงการวิจัย (ถ้ามี)
                </h6>
                <CButton color="success" size="sm" variant="outline" @click="addCoResearcher">
                  <CIcon name="cil-plus" /> เพิ่มผู้ร่วม
                </CButton>
              </div>
              <div v-for="(r, idx) in form.researchers.coResearchers" :key="'co-' + idx"
                class="border rounded p-3 mb-3 bg-light position-relative w-100">
                <div class="d-flex justify-content-between mb-3">
                  <span class="badge badge-success px-3">คนที่ {{ idx + 1 }}</span>
                  <CButton color="danger" size="sm" variant="ghost" @click="removeCoResearcher(idx)">
                    <CIcon name="cil-trash" />
                  </CButton>
                </div>
                <CRow>
                  <CCol lg="4" md="6">
                    <CInput label="ชื่อ-นามสกุล *" v-model="r.name" />
                  </CCol>
                  <CCol lg="4" md="6">
                    <CInput label="สังกัดหน่วยงาน *" v-model="r.affiliation" />
                  </CCol>
                  <CCol lg="4" md="6">
                    <CInput label="เบอร์โทรศัพท์ *" v-model="r.phone" />
                  </CCol>
                  <CCol lg="6" md="6">
                    <CInput label="E-mail *" v-model="r.email" />
                  </CCol>
                  <CCol lg="6" md="12">
                    <CInput label="สัดส่วนการวิจัย (%) *" v-model="r.code" type="number" />
                  </CCol>
                </CRow>
              </div>
              <div v-if="form.researchers.coResearchers.length === 0" class="text-center text-muted py-4"><em>--
                  ยังไม่มีข้อมูลผู้ร่วมโครงการ --</em></div>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-3 mt-5">
              <h5 class="font-weight-bold text-dark mb-0">2) ที่ปรึกษาโครงการวิจัย (ถ้ามี)</h5>
              <CButton color="info" size="sm" variant="outline" @click="addAdvisor">
                <CIcon name="cil-plus" /> เพิ่มที่ปรึกษา
              </CButton>
            </div>
            <div v-for="(adv, idx) in form.researchers.advisors" :key="'adv-' + idx"
              class="border rounded p-4 mb-3 bg-light shadow-sm border-info w-100">
              <div class="d-flex justify-content-between mb-3 align-items-center">
                <h6 class="font-weight-bold text-info mb-0">ที่ปรึกษาคนที่ {{ idx + 1 }}</h6>
                <CButton color="danger" size="sm" variant="ghost" @click="removeAdvisor(idx)">
                  <CIcon name="cil-trash" />
                </CButton>
              </div>
              <CRow>
                <CCol lg="4" md="6">
                  <CInput label="ชื่อ-นามสกุล *" v-model="adv.name" />
                </CCol>
                <CCol lg="4" md="6">
                  <CInput label="สังกัดหน่วยงาน *" v-model="adv.affiliation" />
                </CCol>
                <CCol lg="4" md="6">
                  <CInput label="เบอร์โทรศัพท์ *" v-model="adv.phone" />
                </CCol>
                <CCol lg="12">
                  <CInput label="E-mail address *" v-model="adv.email" />
                </CCol>
              </CRow>
            </div>
          </CCardBody>
        </CCard>
        <!-- ---------------------------------------------------------------------- -->
        <CCard class="shadow-sm w-100 mb-4 border-0">
          <CCardHeader class="bg-primary text-white py-3">
            <h5 class="m-0 font-weight-bold">
              <CIcon name="cil-library" class="mr-2" /> 5-11) รายละเอียดเนื้อหาโครงการวิจัย
            </h5>
          </CCardHeader>
          <CCardBody class="p-4 bg-white">
            <div v-for="(field, i) in textFields" :key="'text-' + i"
              :class="['mb-5 pb-4', i < textFields.length - 1 ? 'border-bottom' : '']">

              <h5 class="font-weight-bold text-dark mb-3">
                <span class="text-primary mr-2">|</span> {{ field.label }}
              </h5>

              <div class="border rounded shadow-sm overflow-hidden">
                <QuillEditor v-model:content="form[field.model]" :options="editorOption" contentType="html"
                  theme="snow" />
              </div>

            </div>
          </CCardBody>
        </CCard>
        <!-- ---------------------------------------------------------------------- -->
        <CCard class="shadow-sm w-100 mb-4 border-0">
          <CCardHeader class="bg-primary text-white py-3">
            <h5 class="m-0 font-weight-bold">
              <CIcon name="cil-calendar" class="mr-2" /> 12) แผนการดำเนินงาน
            </h5>
          </CCardHeader>
          <CCardBody class="p-4 bg-white">
            <ResearchSection12 />
          </CCardBody>
        </CCard>

        <CCard class="shadow-sm w-100 mb-4 border-0">
          <CCardHeader class="bg-primary text-white py-3">
            <h5 class="m-0 font-weight-bold">
              <CIcon name="cil-money" class="mr-2" /> งบประมาณและมาตรฐานวิจัย
            </h5>
          </CCardHeader>
          <CCardBody class="p-4">
            <!-- ---------------------------------------------------------------------- -->
            <div class="mb-5">
              <h5 class="font-weight-bold text-dark">13) ผลงานตามระยะเวลาการรายงาน</h5>
              <QuillEditor v-model:content="form.progressReport" :options="editorOption" contentType="html"
                theme="snow" />


              <h5 class="font-weight-bold mb-4 text-dark border-bottom pb-2">14) ผลลัพธ์ที่คาดว่าจะได้รับ
                (สัมพันธ์กับประเภททุน)</h5>
              <div v-if="form.budgetType" class="p-4 border rounded bg-light shadow-sm mb-4 border-left-primary">
                <template v-if="form.budgetType === 'ทุนนักวิจัยรุ่นใหม่'">
                  <h6 class="font-weight-bold text-primary mb-3">14.1 ทุนนักวิจัยรุ่นใหม่</h6>
                  <div v-for="(opt, idx) in outcomes.newResearcher" :key="idx"
                    class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk1-' + idx" :value="opt"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label" :for="'chk1-' + idx">{{ opt }}</label>
                  </div>
                </template>
                <template v-else-if="form.budgetType === 'ทุนพัฒนานักวิจัย'">
                  <h6 class="font-weight-bold text-success mb-3">14.2 ทุนพัฒนานักวิจัย</h6>
                  <div v-for="(opt, idx) in outcomes.devResearcher" :key="idx"
                    class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk2-' + idx" :value="opt"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label" :for="'chk2-' + idx">{{ opt }}</label>
                  </div>
                </template>
                <template v-if="form.budgetType === 'ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์'">
                  <h6 class="font-weight-bold text-primary mb-3">14.3 ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์</h6>
                  <div v-for="(opt, idx) in outcomes.strategic" :key="idx" class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk1-' + idx" :value="opt"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label" :for="'chk1-' + idx">{{ opt }}</label>
                  </div>
                </template>
                <template v-if="form.budgetType === 'ทุนต่อยอดสู่ภาคอุตสาหกรรม'">
                  <h6 class="font-weight-bold text-primary mb-3">14.4 ทุนต่อยอดสู่ภาคอุตสาหกรรม</h6>
                  <div v-for="(opt, idx) in outcomes.industrial" :key="idx" class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk1-' + idx" :value="opt"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label" :for="'chk1-' + idx">{{ opt }}</label>
                  </div>
                </template>
              </div>
              <div v-else class="alert alert-warning">กรุณาเลือก "ประเภททุน" ในหัวข้อที่ 2 เพื่อเลือกผลลัพธ์</div>
            </div>

            <div class="mb-5">
              <h5 class="font-weight-bold text-dark">15) การบูรณาการงานวิจัย</h5>
              <QuillEditor v-model:content="form.integration" :options="editorOption" contentType="html" theme="snow"
                class="mb-4" />
              <h5 class="font-weight-bold text-dark mb-3">16) ระดับการถ่ายทอดสู่สังคม *</h5>
              <div class="bg-light p-4 rounded border mb-5 shadow-sm w-100 border-left-primary">
                <div class="ml-3">
                  <div v-for="(opt, i) in transferOptions" :key="'trans-' + i" class="custom-control custom-radio mb-3">
                    <input type="radio" :id="'trans-' + i" :value="opt" v-model="form.transferLevel"
                      class="custom-control-input">
                    <label class="custom-control-label text-dark" :for="'trans-' + i" style="cursor: pointer;">
                      {{ opt }}
                    </label>
                  </div>
                </div>
              </div>

              <h5 class="font-weight-bold mb-3 text-dark">17) กรอกรายละเอียดงบประมาณ (พ.ศ. 2569)</h5>
              <div class="border rounded bg-white shadow-sm overflow-hidden mb-4">
                <BudgetSection v-model="form.budgets" />
              </div>
            </div>

            <h5 class="font-weight-bold text-dark mb-4">18) มาตรฐานการวิจัย *</h5>
            <div class="bg-light p-4 rounded border mb-5 shadow-sm w-100 border-left-primary">
              <div class="ml-3">
                <div class="custom-control custom-checkbox mb-4">
                  <input type="checkbox" class="custom-control-input" id="std_none" value="none"
                    v-model="form.standards">
                  <label class="custom-control-label font-weight-bold text-dark" for="std_none"
                    style="font-size: 16px; cursor: pointer;">
                    ไม่มีการทำวิจัยในมนุษย์ / ไม่มีการใช้สัตว์ทดลอง /
                    การวิจัยที่เกี่ยวข้องกับการงานด้านเทคโนโลยีชีวภาพสมัยใหม่
                  </label>
                </div>

                <hr class="my-4 border-dashed">

                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="std_human" value="human"
                    v-model="form.standards">
                  <label class="custom-control-label font-weight-bold text-primary" for="std_human"
                    style="font-size: 17px; cursor: pointer;">
                    มีการทำวิจัยในมนุษย์
                  </label>
                </div>

                <div v-if="form.standards.includes('human')"
                  class="ml-4 mb-4 p-4 border-left bg-white rounded shadow-none">
                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="h_cert" v-model="form.humanDetail.hasCert">
                    <label class="custom-control-label text-dark" for="h_cert"
                      style="font-size: 16px; cursor: pointer;">
                      มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์ (แนบสำเนา 1 ชุด)
                    </label>
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="h_pending"
                      v-model="form.humanDetail.isPending">
                    <label class="custom-control-label text-dark" for="h_pending"
                      style="font-size: 16px; line-height: 1.5; cursor: pointer;">
                      ไม่มีหนังสือรับรองจริยธรรมฯ อยู่ระหว่างเสนอคณะกรรมการจริยธรรมการวิจัยในมนุษย์พิจารณา
                    </label>
                  </div>

                  <div v-if="form.humanDetail.isPending"
                    class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border"
                    style="gap: 15px;">
                    <span class="font-weight-bold text-dark" style="font-size: 15px;">วันที่ยื่นโครงการ:</span>
                    <input type="date" v-model="form.humanDetail.applyDate" class="form-control form-control-sm w-auto"
                      style="height: 35px;">
                    <div class="custom-file-input-wrapper">
                      <input type="file" @change="handleFileUpload($event, 'human')"
                        class="form-control-file border p-1 rounded bg-white">
                    </div>
                  </div>
                </div>

                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="std_animal" value="animal"
                    v-model="form.standards">
                  <label class="custom-control-label font-weight-bold text-primary" for="std_animal"
                    style="font-size: 17px; cursor: pointer;">
                    มีการใช้สัตว์ทดลอง
                  </label>
                </div>

                <div v-if="form.standards.includes('animal')" class="ml-4 p-4 border-left bg-white rounded shadow-none">
                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="animal_cert"
                      v-model="form.animalDetail.hasCert">
                    <label class="custom-control-label text-dark" for="animal_cert"
                      style="font-size: 16px; cursor: pointer;">
                      มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์ (แนบสำเนา 1 ชุด)
                    </label>
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="animal_pending"
                      v-model="form.animalDetail.isPending">
                    <label class="custom-control-label text-dark" for="animal_pending"
                      style="font-size: 16px; line-height: 1.5; cursor: pointer;">
                      ไม่มีหนังสือรับรองจรรยาบรรณสัตว์ฯ อยู่ระหว่างเสนอคณะกรรมการจรรยาบรรณสัตว์ฯ พิจารณา
                    </label>
                  </div>

                  <div v-if="form.animalDetail.isPending"
                    class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border"
                    style="gap: 15px;">
                    <span class="font-weight-bold text-dark" style="font-size: 15px;">วันที่ยื่นโครงการ:</span>
                    <input type="date" v-model="form.animalDetail.applyDate" class="form-control form-control-sm w-auto"
                      style="height: 35px;">
                    <div class="custom-file-input-wrapper">
                      <input type="file" @change="handleFileUpload($event, 'animal')"
                        class="form-control-file border p-1 rounded bg-white">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h5 class="font-weight-bold text-dark">19) หมายเหตุ</h5>
            <QuillEditor v-model:content="form.remark" :options="editorOption" contentType="html" theme="snow"
              class="mb-4" />

            <CRow class="mt-4">
              <div class="container-fluid p-4">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <!-- Header -->
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h5 class="mb-1 font-weight-bold">อัปโหลดเอกสาร</h5>
                        <div class="small-text">
                          เลือกประเภทเอกสารก่อน แล้วอัปโหลดไฟล์จาก หรือกด Browse
                        </div>
                      </div>

                      <button type="button" class="btn btn-outline-dark upload-btn" @click="$refs.fileInput.click()">
                        <i class="fas fa-upload mr-1"></i>
                        <CIcon name="cil-paperclip" class="mr-1" /> อัปโหลดไฟล์
                      </button>
                      <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileUpload2" />
                    </div>

                    <!-- Table -->
                    <div class="table-responsive">
                      <table class="table table-bordered align-middle">
                        <thead>
                          <tr>
                            <th style="width:20%">ประเภท</th>
                            <th style="width:25%">ชื่อไฟล์</th>
                            <th style="width:15%">วัน-เวลา</th>
                            <th style="width:25%">หมายเหตุ</th>
                            <th style="width:15%">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-for="(item, index) in files" :key="index">
                            <td style="width:20%">
                              <select v-model="item.type" class="form-control form-control-sm">
                                <option disabled value="">-- เลือกประเภท --</option>
                                <option>หลักฐานการผ่านการอบรมมาตรฐานการวิจัยในมนุษย์</option>
                                <option>หลักฐานการผ่านการอบรมมาตรฐานความปลอดภัยทางชีวภาพ</option>
                                <option>หลักฐานการผ่านการอบรมมาตรฐานความปลอดภัยห้องปฏิบัติการ</option>
                                <option>
                                  หลักฐานการผ่านการอบรมมาตรฐานความปลอดภัยการดำเนินการต่อสัตว์เพื่องานทางวิทยาศาสตร์
                                </option>
                                <option>อื่น ๆ</option>
                              </select>
                            </td>

                            <td>
                              <a href="#" @click.prevent="openFile(item)" style="color:#1e88e5; cursor:pointer;">
                                {{ item.name }}
                              </a>
                            </td>

                            <td>{{ item.datetime }}</td>

                            <td style="width:25%">
                              <input type="text" v-model="item.note" class="form-control"
                                placeholder="พิมพ์หมายเหตุ..." />
                            </td>

                            <td>
                              <button type="button" class="btn btn-file mr-2" @click="triggerReplace(index)">
                                <CIcon name="cil-settings" class="mr-2" />แก้ไขไฟล์
                              </button>


                              <button type="button" class="btn btn-delete" @click="removeFile(index)">
                                <CIcon name="cil-trash" class="mr-2" />ลบ
                              </button>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                      <input type="file" ref="replaceInput" style="display:none" @change="replaceFile" />

                    </div>

                  </div>
                </div>

              </div>
            </CRow>

          </CCardBody>
        </CCard>
        <CCardFooter class="bg-white p-4 border-top d-flex justify-content-end shadow-sm" style="gap: 15px;">
          <CButton color="danger" variant="outline" class="px-5 font-weight-bold" @click="resetForm">
            <CIcon name="cil-trash" class="mr-2" />ล้างข้อมูล
          </CButton>
          <CButton color="primary" class="px-5 font-weight-bold shadow" @click="saveDraft">
            <CIcon name="cil-save" class="mr-2" /> บันทึกแบบเสนอโครงการ
          </CButton>
          <CButton color="info" @click="goToReport">
            <CIcon name="cil-print" class="mr-2" />
            Export PDF
          </CButton>

        </CCardFooter>
      </div>
    </div>
  </template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
import BudgetSection from "@/components/BudgetSection.vue";
import ResearchSection12 from "@/components/Section12.vue";

export default {
  name: "ResearchForm",
  components: {
    BudgetSection,
    ResearchSection12,
    QuillEditor
  }
  ,
  data() {
    return {
      editorOption: {
        placeholder: 'พิมพ์เนื้อหาที่นี่...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
          ]
        }
      }, files: [],
      // ปรับประเภททุนให้ตรงตามหัวข้อ 14.1 - 14.4
      budgetTypes: [
        { label: "ทุนนักวิจัยรุ่นใหม่", value: "new" },
        { label: "ทุนพัฒนานักวิจัย", value: "dev" },
        { label: "ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์", value: "strategic" },
        { label: "ทุนต่อยอดสู่ภาคอุตสาหกรรม", value: "industrial" }
      ],
      // รายละเอียดผลลัพธ์แยกตามประเภททุน
      outcomes: {
        newResearcher: [
          "นำเสนอในการประชุมวิชาการระดับนานาชาติ โดยต้องเป็นบทความฉบับสมบูรณ์ (Fullpaper) ที่ได้รับการตีพิมพ์ในรายงานสืบเนื่องจากการประชุม (Proceedings)",
          "ตีพิมพ์ในวารสารทางวิชาการที่มีรายชื่ออยู่ในฐานข้อมูล ตามประกาศ ก.พ.อ. เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการ สำหรับการเผยแพร่ผลงานทางวิชาการ",
          "ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูลTCI กลุ่มที่ 1 หรือ กลุ่มที่ 2",
          "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
        ],
        devResearcher: [
          "ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติที่มีรายชื่ออยู่ในฐานข้อมูลตาม ประกาศก.พ.อ.เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการสำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562",
          "ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล TCI กลุ่มที่ 1 เท่านั้น",
          "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
        ],
        strategic: [
          "ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติที่มีรายชื่ออยู่ในฐานข้อมูลตาม ประกาศ ก.พ.อ. เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการสำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562",
          "ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล TCI กลุ่มที่ 1 เท่านั้น",
          "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
        ],
        industrial: [
          "การยื่นขอจดทะเบียนทรัพย์สินทางปัญญา (มีเลขคำขอฯ)"
        ]
      },
      researchTypeOptions: [
        { value: 'Science', label: 'ด้านวิทยาศาสตร์และเทคโนโลยี' },
        { value: 'Health', label: 'ด้านวิทยาศาสตร์สุขภาพ' },
        { value: 'Social', label: 'ด้านสังคมศาสตร์และมนุญศาสตร์' }
      ],
      textFields: [
        { label: "5) คำสำคัญ (Keywords)", model: "keywords" },
        { label: "6) ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { label: "7) วัตถุประสงค์", model: "objective" },
        { label: "8) ทบทวนวรรณกรรม", model: "literature" },
        { label: "9) เอกสารอ้างอิง", model: "reference" },
        { label: "10) วิธีดำเนินการวิจัย", model: "methodology" },
        { label: "11) ขอบเขตการวิจัย", model: "scope" }
      ],
      transferOptions: [
        "สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือนานาชาติ",
        "สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด",
        "ไม่มีการนำไปถ่ายทอดสู่สังคม"
      ],
      form: {
        titleTH: "", titleEN: "", budgetType: "", budgets: [],
        cooperation: "ไม่มี", cooperationDetail: "", researchType: "",
        keywords: "", importance: "", objective: "", literature: "",
        reference: "", methodology: "", scope: "", progressReport: "",
        expectedResults: [], integration: "", transferLevel: "ไม่มีการนำไปถ่ายทอดสู่สังคม",
        ethics: { human: false, animal: false }, remark: "",
        selectedOutcomes: [], standards: [], // เก็บค่า 'none', 'human', 'animal'
        humanDetail: {
          hasCert: false,
          isPending: false,
          applyDate: '',
          file: null
        },
        animalDetail: {
          hasCert: false,
          isPending: false,
          applyDate: '',
          file: null
        },
        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "" },
          coResearchers: [],
          advisors: []
        },
      },

    };
  },
  watch: {
    // เมื่อเปลี่ยนประเภททุน ให้ล้างค่าที่เคยเลือกไว้ในข้อ 14 เพื่อป้องกันข้อมูลปนกัน
    'form.budgetType': function () {
      this.form.selectedOutcomes = [];
    },

  },
  methods: {
    // เพิ่มผู้ร่วมโครงการวิจัย
    addCoResearcher() {
      this.form.researchers.coResearchers.push({
        name: "",
        affiliation: "",
        phone: "",
        email: "",
        code: ""
      });
    },

    // ลบผู้ร่วมโครงการวิจัย
    removeCoResearcher(index) {
      this.form.researchers.coResearchers.splice(index, 1);
    },

    // เพิ่มที่ปรึกษาโครงการ
    addAdvisor() {
      this.form.researchers.advisors.push({
        name: "",
        affiliation: "",
        phone: "",
        email: ""
      });
    },

    // ลบที่ปรึกษาโครงการ
    removeAdvisor(index) {
      this.form.researchers.advisors.splice(index, 1);
    },

    submit() { console.log(this.form); alert("บันทึกสำเร็จ"); },
    goToReport() {
      this.$router.push("/report");
    }

    ,
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      if (type === 'human') {
        this.form.humanDetail.file = file;
      } else {
        this.form.animalDetail.file = file;
      }
    },
    handleFileUpload2(event) {
      const selectedFiles = Array.from(event.target.files);

      selectedFiles.forEach(file => {
        this.files.push({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          datetime: new Date().toLocaleString("th-TH"),
          note: "",
          type: "",
          raw: file
        });

      });

      event.target.value = null;
    },

    openFile(item) {
      if (!item.raw) {
        alert("ไม่พบไฟล์");
        return;
      }

      const fileURL = URL.createObjectURL(item.raw);
      window.open(fileURL, "_blank");
    },


    removeFile(index) {
      this.files.splice(index, 1);
    },

    triggerReplace(index) {
      this.replaceIndex = index;
      this.$refs.replaceInput.click();
    },

    replaceFile(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (this.replaceIndex !== null) {
        this.files[this.replaceIndex].name = file.name;
        this.files[this.replaceIndex].raw = file;
      }

      event.target.value = null;
      this.replaceIndex = null;
    },
  }
};
</script>

<style>

.border-left-primary {
  border-left: 6px solid #321fdb !important;
}

.ml-5 {
  margin-left: 3.5rem !important;
}

/* เส้นประคั่นลำดับชั้นตามภาพ image_b78bdd.png */
.border-left {
  border-left: 3px dashed #321fdb !important;
  transition: all 0.3s ease;
}

.border-dashed {
  border-top: 1px dashed #ced4da;
}

/* ปรับแต่งปุ่มเลือกไฟล์ให้ดูสะอาดตา */
.custom-file-upload input[type="file"] {
  font-size: 13px;
  cursor: pointer;
}

.quill-editor {
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* ปรับแต่งความกว้าง Inputs ให้ดูเต็มแต่ไม่ล้น */
.form-group {
  margin-bottom: 1.5rem;
}

.custom-control-label {
  cursor: pointer;
}

/* Footer Shadow */
.card-footer {
  position: sticky;
  bottom: 0;
  z-index: 10;
  border-top: 1px solid #ebedef;
}

.table th {
  font-weight: 600;
  background: #f8f9fa;
}

.btn-file {
  border: 1px solid #ced4da;
  background: #f8f9fa;
  padding: 4px 12px;
  font-size: 14px;
}

.btn-delete {
  border: 1px solid #dc3545;
  color: #dc3545;
  background: white;
  padding: 4px 10px;
}

.btn-delete:hover {
  background: #dc3545;
  color: white;
}

.upload-btn {
  font-size: 14px;
}

.small-text {
  font-size: 13px;
  color: #6c757d;
}
</style> 