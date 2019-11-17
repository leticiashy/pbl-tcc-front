<template>
  <div>
    <div class="dropbox" v-if="!value">
      <input
        type="file"
        ref="fileInput"
        :name="uploadFieldName"
        :disabled="isSaving"
        @change="
          filesChange($event.target.name, $event.target.files);
          fileCount = $event.target.files.length;
        "
        class="input-file"
      />
      <p
        v-if="filesToUpload.length === 0"
        v-html="$t('GLOBAL.UPLOAD_DEFAULT_MESSAGE')"
      />
      <p
        v-else
        v-html="
          $t('GLOBAL.UPLOAD_WAITING_MESSAGE').replace(
            '$FILECOUNT',
            filesToUpload.length
          )
        "
      />
    </div>
    <div v-else>
      <v-btn v-if="!blockNew" primary @click="reset">
        {{ $t("GLOBAL.UPLOAD_NEW") }}
      </v-btn>

      <div class="dropbox sent">
        <a :href="value" target="_blank">
          <div :class="`box ${fileFormat}`">
            <h3 class="format">
              {{ fileFormat }}
            </h3>
          </div>

          <div class="link-text">
            {{ fileName }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClient from "@/services/ApiClient";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  props: ["value", "blockNew"],
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      filesToUpload: [],
      currentStatus: null,
      uploadFieldName: "files",
      apiClient: new ApiClient(process.env.BUCKET_BASE_URL)
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    fileName() {
      return this.value.split("/").pop();
    },
    fileFormat() {
      const fileFormat = this.value.split(".").pop();

      if (fileFormat.length <= 3) {
        return fileFormat;
      } else {
        return "unk";
      }
    }
  },
  methods: {
    reset() {
      this.$emit("input", "");
    },
    filesChange(fieldName, fileList) {
      if (!fileList.length) return;

      this.filesToUpload = this.filesToUpload.concat(fileList);

      const formData = new FormData();

      const file = this.filesToUpload[0][0];

      formData.append("file", file, file.name);

      this.apiClient.post("file", formData).then(response => {
        console.log(response);
        this.$emit("input", response.location);
      });
    }
  }
};
</script>

<style>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
}

.dropbox:not(.sent) {
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:not(.sent):hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox.sent {
  padding: 15px;
  display: flex;
  justify-content: end;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.dropbox .link-text {
  max-width: 150px;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

.dropbox a {
  align-self: flex-end;
}

.dropbox .box {
  background: rgba(250, 0, 0, 0.7);
  height: 150px;
  width: 150px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.dropbox .box.pdf {
  background: rgba(250, 100, 100, 0.7);
}

.dropbox .box.unk {
  background: rgba(100, 100, 100, 0.7);
}

.dropbox .box.rar,
.dropbox .box.zip {
  background: rgba(250, 0, 250, 0.7);
}

.dropbox .box .format {
  font-weight: bold;
  color: white;
  font-size: 4rem;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
